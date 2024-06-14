import yaml
import json
import os
from tkinter import Tk
from tkinter.filedialog import askopenfilename

def convert_yaml_to_json(input_file_path):
    out_directory = os.path.dirname(os.path.abspath(__file__))
    
    file_name, file_extension = os.path.splitext(os.path.basename(input_file_path))

    output_file_path = os.path.join(out_directory, file_name + '.json')

    # YAML 파일 읽고 json 파일로 저장하기
    with open(input_file_path, 'r', encoding='utf-8') as yaml_file:
        yaml_data = yaml.safe_load(yaml_file)

    with open(output_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(yaml_data, json_file, ensure_ascii=False, indent=4)

    print(f"YAML 파일이 {output_file_path}에 JSON 형식으로 저장되었습니다.")
    print(output_file_path)

root = Tk()
root.withdraw()



# 파일 선택

print("변환할 YAML 파일을 선택하세요.")
input_file_path = askopenfilename(filetypes=[("YAML files", "*.yaml *.yml")])

if input_file_path:
    convert_yaml_to_json(input_file_path)
else:
    print("파일이 선택되지 않았습니다.")
