// 此文件需部署在GitHub Pages的functions目录，利用GitHub Actions的权限修改文件
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GH_TOKEN });

module.exports = async (req, res) => {
    const type = req.query.type;
    const fileName = type === "visit" ? "visit-signal.txt" : "like-signal.txt";
    
    // 修改信号文件（触发工作流）
    await octokit.rest.repos.createOrUpdateFileContents({
        owner: "lopoph",
        repo: "666",
        path: fileName,
        message: `Add ${type} signal`,
        content: Buffer.from(new Date().toString()).toString("base64"),
        branch: "main"
    });

    res.status(200).send("OK");
};
