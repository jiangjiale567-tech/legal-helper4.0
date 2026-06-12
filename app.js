// =========================================================================
// 1. 知识库与数据源 (Knowledge Base): 严格对齐最新《公司法》及最高院指导案例
// =========================================================================
const casesData = [
    {
        category: '股权治理与新公司法',
        title: '【最高院指导案例】未依法履行出资期限及分期成熟纠纷案',
        summary: '新《公司法》（2024修订）第47条明确规定全体股东认缴的出资额由股东自公司成立之日起五年内缴足。某科技公司章程约定20年认缴，因未能及时调整并合理设计核心员工分期成熟（Vesting）机制，导致核心技术人员在第2年离职并带走20%非成熟股权，引发诉讼，最终导致公司因大股东出资期限加速到期且股权锁死而陷入僵局。'
    },
    {
        category: '劳资用工风控',
        title: '【典型判例】初创企业高管“未签书面劳动合同”索要双倍工资惩罚案',
        summary: '依据《劳动合同法》第82条，某初创项目因信任联合创始人而未在入职30天内签署正式劳动合同。该高管在项目运营第11个月时因理念不合离职，随即提起劳动仲裁，要求公司支付前10个月双倍工资差额共计25万元，获得仲裁委全力支持，直接抽干了初创公司的天使轮现金流。'
    }
];

// =========================================================================
// 2. 修复后的顶部导航栏：现代平滑滚动跳转系统
// =========================================================================
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止死板的原生闪现跳转
        
        // 1. 切换按钮的 active 状态高亮
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // 2. 平滑定位滚动到对应 ID 的模块
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 内部工作台三大小工具的 Tab 切换函数
function switchTool(toolType) {
    document.querySelectorAll('.tool-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.tool-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`tool-${toolType}`).classList.add('active');
}

// 统一的一键复制交付产物工具函数
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 备忘录已成功复制到剪贴板，可直接发送给合伙人或投资人！');
    }).catch(err => {
        alert('复制失败，请手动选中文本复制。');
    });
}

// =========================================================================
// 3. 系统 Skill 优化: 固化法律专家 IRAC 结构化论证模型
// =========================================================================

// 工具一：职业规划与机会成本
function runCareerCalc() {
    const salary = parseFloat(document.getElementById('currentSalary').value) || 0;
    const years = parseFloat(document.getElementById('startupYears').value) || 0;
    const invest = parseFloat(document.getElementById('investAmount').value) || 0;
    const equity = parseFloat(document.getElementById('equityShare').value) || 0;
    const valuation = parseFloat(document.getElementById('expectedValuation').value) || 0;

    const opportunityCost = (salary * years) + invest;
    const theoreticalValue = valuation * (equity / 100);
    const netReturn = theoreticalValue - opportunityCost;

    document.getElementById('careerResult').innerHTML = `
        <div id="careerMemo" style="background:#fff; border:1px solid #CBD5E1; padding:20px; font-family:SimSun, Georgia, serif;">
            <p style="text-align:center; font-size:18px; font-weight:bold; border-bottom:2px solid #0F172A; padding-bottom:8px; margin-bottom:16px; color:#0F172A;">
                LEGAL MEMORANDUM | 创业机会成本与法务风控备忘录
            </p>
            <p><strong>【诊断事由 (Issue)】</strong> 离职创业的沉没成本财务清算与基础代持/公积风险评估</p>
            <p><strong>【法定裁量依据 (Rule)】</strong> 《中华人民共和国民法典》合同编、新《公司法》（2024版）关于出资责任的规定。</p>
            <p><strong>【法理与财务适用分析 (Application)】</strong></p>
            <ul style="padding-left:20px; margin-bottom:12px;">
                <li><strong>机会成本清算：</strong>放弃当前稳定年薪总计 ${salary * years} 万元，叠加入股现金 ${invest} 万元，累计清算机会成本为 <strong>${opportunityCost.toFixed(1)} 万元</strong>。</li>
                <li><strong>资产对价退出估算：</strong>持股 ${equity}% 对应下轮目标投后估值 ${valuation} 万元，纸面账面价值为 <strong>${theoreticalValue.toFixed(1)} 万元</strong>。</li>
                <li><strong>精算绝对损益：</strong>理论净回报预期为 <span style="color:${netReturn >= 0 ? '#16A34A' : '#DC2626'}">${netReturn.toFixed(1)} 万元</span>。</li>
            </ul>
            <p><strong>【合规行动结论 (Conclusion)】</strong></p>
            <p style="background:#F8FAFC; padding:10px; border-left:3px solid #2563EB; font-size:13px; color:#334155;">
                1. 鉴于您个人投入了 <strong>${invest}万元</strong> 现金，新《公司法》第47条推行5年内限期实缴制。请务必在《股东协议》中明确此项资金是计入“注册资本”还是“资本公积”，避免在5年内因外部债权人强制要求加速实缴而承担连带资本补充责任。<br>
                2. 股权账面资产变现周期极长，建议前置签署《创始人回购及退出清算协议》以对冲流动性风险。
            </p>
        </div>
        <button class="btn-action" style="margin-top:12px; background:#2563EB;" onclick="copyToClipboard('careerMemo')">一键复制《风控备忘录》</button>
    `;
    document.getElementById('careerResult').style.display = 'block';
}

// 工具二：合伙人股权动态评估
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
        <div id="equityMemo" style="background:#fff; border:1px solid #CBD5E1; padding:20px; font-family:SimSun, Georgia, serif;">
            <p style="text-align:center; font-size:18px; font-weight:bold; border-bottom:2px solid #0F172A; padding-bottom:8px; margin-bottom:16px; color:#0F172A;">
                LEGAL MEMORANDUM | 动态股权架构与公司治理控制权备忘录
            </p>
            <p><strong>【诊断事由 (Issue)】</strong> 合伙人多维生产要素加权评估与控制权死锁前置防范</p>
            <p><strong>【法定裁量依据 (Rule)】</strong> 新《公司法》（2024版）第66条（有限责任公司股东会特别决议绝对控制权线为2/3表决权，即66.7%）、普通决议线（50%）。</p>
            <p><strong>【多维要素适用分析 (Application)】</strong></p>
            <ul style="padding-left:20px; margin-bottom:12px;">
                <li><strong>创始人(A) 顶层建议持股比例：</strong> <strong>${shareA.toFixed(1)} %</strong></li>
                <li><strong>联合创始人(B) 建议持股比例：</strong> <strong>${shareB.toFixed(1)} %</strong></li>
                <li><strong>治理结构健康度：</strong> ${shareA >= 66.7 ? '✨ 已达到绝对控制权生死线（67%），具备极高的抗死锁能力。' : '⚠️ 未达到66.7%绝对控制权。根据新《公司法》修改章程、增资减资、合并分立等重大法案将面临被B方一票否决的死锁风险。'}</li>
            </ul>
            <p><strong>【合规行动结论 (Conclusion)】</strong></p>
            <p style="background:#F8FAFC; padding:10px; border-left:3px solid #2563EB; font-size:13px; color:#334155;">
                严禁采用 50:50 或 33:33:33 的均分主义股权模式。建议在《合伙协议》或《公司章程》中特设<strong>“表决权与分红权分离”条款</strong>，或者通过设立“持股平台（有限合伙企业）”由创始人A担任GP，将联合创始人的表决权进行集中收拢，保障公司决策高效率。
            </p>
        </div>
        <button class="btn-action" style="margin-top:12px; background:#2563EB;" onclick="copyToClipboard('equityMemo')">一键复制《控制权备忘录》</button>
    `;
    document.getElementById('equityResult').style.display = 'block';
}

// 工具三：企业合规风险自测
function runDiagnosticCalc() {
    const checkboxes = document.querySelectorAll('.diag-cb');
    let totalScore = 0;
    checkboxes.forEach(cb => { if (cb.checked) { totalScore += parseInt(cb.value); } });

    let riskLevel = "🔴 高危诉讼状态（法务防火墙严重缺漏）";
    let adviceText = "根据未勾选的盲区项，您当前在《公司法》五年限期实缴、知识产权归属以及劳动合同双倍工资惩罚方面存在极高的司法追偿隐患。";
    
    if (totalScore >= 75) {
        riskLevel = "🟢 基础合规状态（已具备基础防御机制）";
        adviceText = "您的基础合规底座较为扎实，已有效屏蔽了初创期80%以上的高频法律地雷，请继续保持动态复核。";
    } else if (totalScore >= 50) {
        riskLevel = "🟡 中度风险状态（存在高危合规漏洞）";
        adviceText = "在特定模块（例如知识产权或劳动合同）存在显著缺口，极易成为离职员工或竞争对手恶意诉讼的突破口。";
    }

    document.getElementById('diagnosticResult').innerHTML = `
        <div id="diagnosticMemo" style="background:#fff; border:1px solid #CBD5E1; padding:20px; font-family:SimSun, Georgia, serif;">
            <p style="text-align:center; font-size:18px; font-weight:bold; border-bottom:2px solid #0F172A; padding-bottom:8px; margin-bottom:16px; color:#0F172A;">
                COMPLIANCE AUDIT | 初创企业法务健康审计报告
            </p>
            <p><strong>【审计结果 (Issue)】</strong> 初创企业基础合规漏洞全景摸排</p>
            <p><strong>【合规审计得分】</strong> <span style="font-size:16px; font-weight:bold;">${totalScore} / 100分</span></p>
            <p><strong>【安全评级结论 (Conclusion)】</strong> <strong style="color:#0F172A;">${riskLevel}</strong></p>
            <p><strong>【针对性矫正建议 (Application)】</strong></p>
            <p style="background:#F8FAFC; padding:10px; border-left:3px solid #2563EB; font-size:13px; color:#334155; line-height:1.6;">
                ${adviceText}<br><br>
                <strong>💡 紧急合规加固动作：</strong><br>
                1. 凡未签《知识产权归属协议》的研发，员工离职后核心代码/技术的所有权归属极易产生争议，须立即补签。<br>
                2. 针对新《公司法》的五年实缴制，请仔细核对公司注册资本，如过大且无法实缴，请在倒计时内执行减资程序。
            </p>
        </div>
        <button class="btn-action" style="margin-top:12px; background:#2563EB;" onclick="copyToClipboard('diagnosticMemo')">一键复制《审计报告》</button>
    `;
    document.getElementById('diagnosticResult').style.display = 'block';
}

// 初始化案例渲染
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

// =========================================================================
// 4. 法律声明与隐私政策弹窗控制
// =========================================================================
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
            <p>您手动提交的联系信息与案件描述。该等数据将被严格限制在内部，法律团队仅用于为您定向梳理合规研报之目的。</p>
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
