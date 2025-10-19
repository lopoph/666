import json
import os
from datetime import datetime

def update_stats():
    # 读取或创建data.json文件
    try:
        with open('../data.json', 'r') as f:
            data = json.load(f)
    except:
        data = {'pageViews': 0, 'likes': 0, 'lastUpdated': ''}
    
    # 更新访问量
    data['pageViews'] = data.get('pageViews', 0) + 1
    data['lastUpdated'] = datetime.now().isoformat()
    
    # 保存更新
    with open('../data.json', 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Updated: {data['pageViews']} views")

if __name__ == '__main__':
    update_stats()
