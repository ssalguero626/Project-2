CREATE TABLE nyc_311_calls (
	Unique_Key INT,
	Created_Date TIMESTAMP,
	Closed_Date TIMESTAMP,
	Agency VARCHAR,
	Agency_Name VARCHAR,
	Complaint_Type VARCHAR,
	Location_Type VARCHAR,
	Incident_Zip INT,
	City VARCHAR,
	Status VARCHAR,
	Borough VARCHAR,
	Latitude NUMERIC,
	Longitude NUMERIC
);

SELECT * FROM nyc_311_calls;