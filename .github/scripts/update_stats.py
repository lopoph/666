import json
import os
from datetime import datetime

def update_stats():
    # 定义数据文件路径
    data_file = 'data.json'
    
    # 如果文件不存在，则初始化
    if not os.path.isfile(data_file):
        print("数据文件不存在，正在创建...")
        initial_data = {"pageViews": 0, "likes": 0, "lastUpdated": ""}
        with open(data_file, 'w') as f:
            json.dump(initial_data, f, indent=4)
    
    # 读取当前数据
    try:
        with open(data_file, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"读取数据文件失败: {e}")
        return
    
    # 增加访问量
    data['pageViews'] = data.get('pageViews', 0) + 1
    data['lastUpdated'] = datetime.now().isoformat()
    
    # 写入更新后的数据
    try:
        with open(data_file, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"数据更新成功！访问量: {data['pageViews']}")
    except Exception as e:
        print(f"写入数据文件失败: {e}")

if __name__ == '__main__':
    update_stats()
