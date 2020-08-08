from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import os
from postgres_pw import pw
from sqlalchemy.ext.automap import automap_base


engine = create_engine(
    f"postgresql://postgres:{pw}@localhost:5432/Project-2")

# Reflect existing database into a new model

Base = automap_base()

# Reflect the tables

Base.prepare(engine, reflect=True)


# Creating app

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:{pw}@localhost:5432/Project-2"
#db = SQLAlchemy(app)


# Define application routes


@app.route("/")
def home():
    nyc_data = engine.execute(
        "SELECT agency, complaint_type, borough, latitude, longitude FROM nyc_311_calls")
    nyc_311 = []
    for line in nyc_data:
        nyc_311.append(line)
    return render_template("index.html", nyc_311=nyc_311)


@app.route("/agency")
def get_agency_counts():
    query = 'SELECT agency, COUNT(agency) FROM nyc_311_calls GROUP BY agency ORDER BY COUNT(agency) DESC'
    results = engine.execute(query)
    output = {}
    for result in results:
        output[result[0]] = result[1]
    return jsonify(output)


@app.route("/complaint")
def get_complaint_type_counts():
    query = 'SELECT complaint_type, COUNT(complaint_type) FROM nyc_311_calls GROUP BY complaint_type LIMIT 15'
    results = engine.execute(query)
    output = {}
    for result in results:
        output[result[0]] = result[1]
    return jsonify(output)


@app.route("/borough")
def get_borough_counts():
    query = 'SELECT borough, COUNT(borough) FROM nyc_311_calls GROUP BY borough ORDER BY COUNT(borough) DESC'
    results = engine.execute(query)
    output = {}
    for result in results:
        output[result[0]] = result[1]
    return jsonify(output)


@app.route("/coordinates")
def get_coordinates():
    query = 'SELECT latitude, longitude FROM nyc_311_calls WHERE latitude, longitude IS NOT NULL'
    results = engine.execute(query)
    output = []
    for result in results:
        output[result[0]] = result[1]
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
