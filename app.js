// 1. 创业者深度案例库数据
const casesData = [
    {
        category: '股权治理',
        title: '早期核心员工离职带走20%非成熟股权案',
        summary: '某SaaS初创公司由于没有在合伙协议中写明股权按4年分期成熟（Vesting），导致技术联合创始人在第4个月出走并拒绝退还股份，最终由于公司股权锁死、新投资人无法进场而破产清算。'
    },
    {
        category: '知识产权',
        title: '产品上线后遭同行抢注核心商标强制下架案',
        summary: '一跨境电商团队项目研发半年，未前置检索并提交商标申请，被恶意同行针对性抢注。上线首周即收到律师函，导致全网下架，重命名改版造成直接经济损失数十万元。'
    }
];

// 2. 页面与工具箱 Tab 导航系统
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        
        this.classList.add('active');
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
    });
});

function switchTool(toolType) {
    document.querySelectorAll('.tool-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.tool-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`tool-${toolType}`).classList.add('active');
}

// 3. 工具一：职业规划分析核心算法
function runCareerCalc() {
    const salary = parseFloat(document.getElementById('currentSalary').value) || 0;
    const years = parseFloat(document.getElementById('startupYears').value) || 0;
    const invest = parseFloat(document.getElementById('investAmount').value) || 0;
    const equity = parseFloat(document.getElementById('equityShare').value) || 0;
    const valuation = parseFloat(document.getElementById('expectedValuation').value) || 0;

    const opportunityCost = (salary * years) + invest;
    const theoreticalValue = valuation * (equity / 100);
    const netReturn = theoreticalValue - opportunityCost;
    const isProfitable = netReturn > 0;

    document.getElementById('careerResult').innerHTML = `
        <h4 style="margin-bottom:12px; font-size:16px;">📊 测算报告结论</h4>
        <p style="font-size:14px; margin-bottom:6px;"><b>创业总沉没机会成本：</b>${opportunityCost.toFixed(1)} 万元</p>
        <p style="font-size:14px; margin-bottom:6px;"><b>预期股权纸面账面价值：</b>${theoreticalValue.toFixed(1)} 万元</p>
        <p style="font-size:15px; font-weight:700; color: ${isProfitable ? '#16A34A' : '#DC2626'}">
            <b>预期绝对损益净回报：</b>${isProfitable ? '+' : ''}${netReturn.toFixed(1)} 万元
        </p>
        <div style="margin-top:14px; font-size:13px; color:#475569; line-height:1.6; border-top:1px dashed #CBD5E1; padding-top:10px;">
            <b>💡 核心法务提示：</b><br>
            1. 您的个人投入资金 <b>${invest}万元</b> 务必明确在股东会决议和章程里是属于“注册资本”还是“资本公 公积金”，防止后续发生坏账纠纷。<br>
            2. 期权或股权的变现极度依赖清算和退出通道，建议在合伙协议中写明<b>回购触发机制</b>，保障基础底层现金流安全。
        </div>
    `;
    document.getElementById('careerResult').style.display = 'block';
}

// 4. 工具二：合伙人股权要素动态计算核心算法
function runEquityCalc() {
    const ideaA = parseFloat(document.getElementById('eq-idea-a').value);
    const ideaB = parseFloat(document.getElementById('eq-idea-b').value);
    const moneyA = parseFloat(document.getElementById('eq-money-a').value);
    const moneyB = parseFloat(document.getElementById('eq-money-b').value);
    const timeA = parseFloat(document.getElementById('eq-time-a').value);
    const timeB = parseFloat(document.getElementById('eq-time-b').value);

    const totalA = (ideaA * 0.3) + (moneyA * 0.3) + (timeA * 0.4);
    const totalB = (ideaB * 0.3) + (moneyB * 0.3) + (timeB * 0.4);
    const sum = totalA + totalB;

    const shareA = (totalA / sum) * 100;
    const shareB = (totalB / sum) * 100;

    document.getElementById('equityResult').innerHTML = `
        <h4 style="margin-bottom:12px; font-size:16px;">⚖️ 动态股权分配建议报告</h4>
        <p style="font-size:14px; margin-bottom:6px;"><b>创始人 (A) 建议分配持股：</b>${shareA.toFixed(1)} %</p>
        <p style="font-size:14px; margin-bottom:6px;"><b>联合创始人 (B) 建议分配持股：</b>${shareB.toFixed(1)} %</p>
        <div style="margin-top:14px; font-size:13px; color:#475569; line-height:1.6; border-top:1px dashed #CBD5E1; padding-top:10px;">
            <b>💡 动态治理警示：</b><br>
            初创期<b>极度忌讳 50:50 或者 33:33:33 的等额平分股权</b>，必须有一方在表决权上拥有绝对控股权（超过51%或67%），否则当公司在遇到转型分歧时将陷入完全僵局。
        </div>
    `;
    document.getElementById('equityResult').style.display = 'block';
}

// 5. 工具三：合规自测得分矩阵核心算法
function runDiagnosticCalc() {
    const checkboxes = document.querySelectorAll('.diag-cb');
    let totalScore = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) { totalScore += parseInt(cb.value); }
    });

    let riskLevel = "高危风险状态";
    let riskColor = "#DC2626";
    if (totalScore >= 75) { riskLevel = "良好合规状态"; riskColor = "#16A34A"; }
    else if (totalScore >= 50) { riskLevel = "中度风险隐患"; riskColor = "#D97706"; }

    document.getElementById('diagnosticResult').innerHTML = `
        <h4 style="margin-bottom:12px; font-size:16px;">🏥 企业合规健康报告</h4>
        <p style="font-size:14px; margin-bottom:6px;"><b>合规得分：</b> ${totalScore} / 100 分</p>
        <p style="font-size:15px; font-weight:700; color: ${riskColor}"><b>当前安全状态：</b> ${riskLevel}</p>
        <div style="margin-top:14px; font-size:13px; color:#475569; line-height:1.6; border-top:1px dashed #CBD5E1; padding-top:10px;">
            <b>🛠️ 紧急补救清单建议：</b><br>
            ${totalScore === 100 ? '极佳！您的法律底座很扎实，建议保持跟踪。' : '对于您未勾选的盲区项，通常意味着可能面临员工提起劳动仲裁、或者是核心商标被迫改名的诉讼风险。建议尽快前往下方“专家合规预约”提交复核申请。'}
        </div>
    `;
    document.getElementById('diagnosticResult').style.display = 'block';
}

// 6. 初始化案例渲染
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('casesGrid');
    if(grid) {
        grid.innerHTML = casesData.map(c => `
            <div class="case-card">
                <span class="case-tag">${c.category}</span>
                <h3>${c.title}</h3>
                <p>${c.summary}</p>
            </div>
        `).join('');
    }
});

// 7. 完善的法律条款文本数据库与弹窗控制逻辑
const legalTexts = {
    disclaimer: {
        title: "免责声明 (Disclaimer)",
        content: `
            <h4>一、数字化模型性质声明</h4>
            <p>本工作台（FounderLegal）所包含的各项商业测算工具均系基于特定既定算法公式及普适性法律风控逻辑进行的前置推演。<strong>上述所有内容仅供创业者内部探讨及项目早期风险自查参考，不构成任何具备法律效力的正式法律意见、法务判决预测、或专业律师的个案执业诊断结论。</strong></p>
            <h4>二、商业决策风险自担</h4>
            <p>由于法律实践具有高度的个案特殊性，用户依据本站模型测算结果所做出的任何商业决策、签署的合伙协议、资产交割行为，其可能引发的商业风险，均由用户自行完全承担。本站不对任何因信赖本站工具而产生的直接或间接损失承担责任。</p>
        `
    },
    privacy: {
        title: "隐私政策 (Privacy Policy)",
        content: `
            <h4>一、零数据留存原则（全本地流式计算）</h4>
            <p>本站的各大计算器及自测模块<strong>均采用完全基于用户浏览器本地运行的客户端 JavaScript 脚本技术</strong>。当您在输入框内填入数据或勾选合规清单时，<strong>本站服务器绝不捕获、不上传、不缓存、不留存您的任何商业数据流</strong>。关闭网页后，本地临时数据即刻清空。</p>
            <h4>二、专家合规预约表单的加密保护</h4>
            <p>您手动提交的联系信息与案件描述。该等数据将被严格限制在内部，<strong>仅用于为您定向梳理合规研报之目的</strong>。</p>
        `
    },
    terms: {
        title: "使用条款 (Terms of Use)",
        content: `
            <h4>一、服务条款的接受与修订</h4>
            <p>当您进入、浏览、操作 FounderLegal 数字化合规工作台时，即视为您已完全阅读、理解并同意接受本使用条款的全部约束。</p>
            <h4>二、专有知识产权声明</h4>
            <p>本工作台内包含的全部专有测算模型、样式代码（CSS）、底座代码（JS脚本）知识产权均归属于本站。<strong>未经授权，禁止任何个人或机构对本站进行恶意镜像复制或整站二开倒卖。</strong></p>
        `
    }
};

function openLegalModal(type) {
    const data = legalTexts[type];
    if (!data) return;
    document.getElementById('legalModalTitle').innerText = data.title;
    document.getElementById('legalModalBody').innerHTML = data.content;
    document.getElementById('legalModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
    document.getElementById('legalModal').classList.remove('active');
    document.body.style.overflow = '';
}

window.addEventListener('click', function(e) {
    const modal = document.getElementById('legalModal');
    if (e.target === modal) { closeLegalModal(); }
});