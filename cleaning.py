import pandas as pd
import numpy as np
import sqlite3
import json

with open('./output.json') as data_file:
    data = json.load(data_file)

df = pd.json_normalize(data=data, meta=['name', 'profileUrl', 'similarityScore'], errors="ignore")

scores = df[["name", "similarityScore"]]

print(scores)
scores.to_csv(r'./similarity-report.csv', index=True, header=True)
