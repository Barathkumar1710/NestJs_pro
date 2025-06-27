from pyspark.sql import SparkSession
import json
import os
 
class HiveJDBCReader:
    def __init__(self):
        self.jdbc_url = (
            "jdbc:hive2://hklvathdp001.hk.standardchartered.com:10000/"
            ";AuthMech=1"
            ";KrbRealm=ZONE1.SCBDEV.NET"
            ";KrbHostFQDN=hklvathdp001.hk.standardchartered.com"
            ";KrbServiceName=hive"
            ";KrbAuthType=2"
            ";principal=hive/hklvathdp001.hk.standardchartered.com@ZONE1.SCBDEV.NET"
            ";ssl=true"
            ";sslTrustStore=/etc/hive-jks/hivetrust.jks"
            ";trustStorePassword=xxxxxxxxx"
            ";transportMode=http"
            ";httpPath=cliservice"  
        )
 
        # Must be an alias for subquery
        self.table_name = "delrr_daas_dev.cl_sub_ledgr_trade"
        self.spark = self._create_spark_session()
 
    def _create_spark_session(self):
        return SparkSession.builder \
            .appName("Hive JDBC SSL via Kerberos") \
            .config("spark.ui.enabled", "false") \
            .master("local") \
	    .enableHiveSupport() \
            .getOrCreate()

 
    def read_data(self):
        try:
            df = self.spark.read \
                .format("jdbc") \
                .option("url", self.jdbc_url) \
                .option("dbtable", self.table_name) \
                .option("driver", "org.apache.hive.jdbc.HiveDriver") \
                .load()
 
            print("Data successfully pulled from Hive DB")
            
            df.createOrReplaceTempView("hive_table")
            result_df = self.spark.sql("SELECT * FROM delrr_daas_dev.cl_sub_ledgr_trade where ods_val = '2024-09-30' AND country_val='DE' AND tp_sys_val='XX' AND process_id_val LIKE '%SUB_LEDGR_TRADE%' limit 10")
            result_df.show()
            records = result_df.toJSON().collect()
            with open("/CTRLFW/EDMp/LRR/RCL/DELRR/dev/logs/SMS_output/hiveoutput.json", "w") as output_file:
                for line in records:
                    output_file.write(line + '\n')

            print("Data written to output.json")
 
        except Exception as e:
            print(f"Error occurred while fetching Hive data: {e}")
        finally:
            self.spark.stop()
            print(" Spark session stopped.")
 
if __name__ == "__main__":
    reader = HiveJDBCReader()
    reader.read_data()
