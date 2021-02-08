#!/usr/bin/env python
# The purpose of this script is to fix bug https://github.com/Code4Nepal/akshara-project/issues/76
# Kavitakosh.org changed their format and started including author name in their title. 
# The crawling script has been fixed too. This script helps to clean existing data so we do not need to re-index just for this reason.

import os, json

path_to_json = 'crawled/kavitakosh/'
json_files = []

# Find author folders in the folder and add all the json files inside it
for folder in os.listdir(path_to_json):
	files = [os.path.join(path_to_json, folder, pos_json) for pos_json in os.listdir(path_to_json + folder) if pos_json.endswith('.json') and not 'undetected.json' in pos_json]
	json_files.extend(files)

for json_file in json_files:
	with open(json_file, 'r+') as outfile:  
		data = json.load(outfile)
		tmp = data["title"].split('/')[0]
		data["title"] = tmp

		outfile.seek(0)  # rewind
		json.dump(data, outfile)
		outfile.truncate()
