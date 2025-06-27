from flask import Flask, request, jsonify
from flask_cors import CORS
from hivedbWithClass11 import HiveJDBCReader
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # CORS for Next.js frontend

@app.route('/fetch-hive-data', methods=['POST'])
def fetch_hive_data():
    data = request.get_json()

    table_name = data.get('table_name')
    ods_val = data.get('ods_val')
    version_val = data.get('version_val', '')
    process_id_val = data.get('process_id_val')
    country_val = data.get('country_val')
    limit = data.get('limit', 10)

    # Validate required fields
    if not all([table_name, ods_val, process_id_val, country_val]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        reader = HiveJDBCReader()
        spark = reader.spark

        query = f"""
            SELECT DISTINCT * FROM {table_name}
            WHERE ods_val = '{ods_val}'
              AND country_val = '{country_val}'
              {"AND version_val = '" + version_val + "'" if version_val else ""}
              AND process_id_val LIKE '%{process_id_val}%'
            LIMIT {limit}
        """

        print("Executing query:", query)
        df = spark.sql(query)
        records = df.toJSON().collect()

        return jsonify([json.loads(row) for row in records])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        reader.spark.stop()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)




#!/bin/bash

# 1. Run kinit for Kerberos
kinit g.delrrdev.001.dev@ZONE1.SCBDEV.NET

# 2. Set PYTHONPATH so pyspark can be found
export SPARK_HOME=/usr/hdp/current/spark2-client
export PYTHONPATH=$SPARK_HOME/python:$SPARK_HOME/python/lib/py4j-*.zip:$PYTHONPATH

# 3. Run the Flask API using python3 directly (not spark-submit)
echo "Starting Flask API..."
python3 /CTRLFW/EDMp/LRR/RCL/DELRR/sms/hiveDBConnection/hivedb_api.py
