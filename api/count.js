// api/count.js
export default async function handler(req, res) {
  // 你的Gist信息
  const GIST_ID = "ee8d8cd26c542f06ca09004b82d9";
  const FILE_NAME = "count.json";
  const { type } = req.query;

  try {
    // 1. 验证计数类型
    if (!["visit", "like"].includes(type)) {
      return res.status(400).json({ error: "仅支持visit/like类型" });
    }

    // 2. 获取Gist数据（用环境变量中的Token）
    const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Authorization: `token ${process.env.GH_TOKEN}` }
    });
    if (!gistRes.ok) throw new Error(`Gist请求失败: ${gistRes.status}`);
    const gistData = await gistRes.json();

    // 3. 解析并更新计数
    const content = gistData.files[FILE_NAME]?.content || '{"visit":0, "like":0}';
    const count = JSON.parse(content);
    count[type] = (count[type] || 0) + 1;

    // 4. 提交更新到Gist
    const updateRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        files: { [FILE_NAME]: { content: JSON.stringify(count) } }
      })
    });
    if (!updateRes.ok) throw new Error(`Gist更新失败: ${updateRes.status}`);

    // 返回最新计数
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
