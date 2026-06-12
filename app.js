// =========================================================================
// 1. 内置核心规则数据库（对齐新公司法与劳动法硬编码逻辑）
// =========================================================================
const LAW_CORES = {
    equity: `[法条原文] 新《公司法》（2024版）第47条：全体股东认缴的出资额由股东自公司成立之日起五年内缴足。第54条：公司不能清偿到期债务的，公司或者债权人有权请求未届出资期限的股东提前缴纳出资（出资加速到期）。`,
    labor: `[法条原文] 《劳动合同法》第82条：用人单位自用工之日起超过一个月不满一年未与劳动者订立书面劳动合同的，应当向劳动者每月支付双倍的工资。第36-42条严格限制解除类型及经济补偿标准。`,
    ip: `[法条原文] 《商标法》第三条：经商标局核准注册的商标为注册商标，商标注册人享有商标专用权，受法律保护。未检索盲目上线存在侵权民事损害赔偿及被诉不正当竞争风险。`
};

const casesData = [
    {
        category: '股权治理与出资加速到期',
        title: '【类案裁判指引】未按规定限期实缴引发连带清偿责任纠纷案',
        summary: '在最高院典型判例中，某初创企业因股东协议约定20年认缴且未在2024新《公司法》施行后及时修正出资期限。公司因商事合同违约遭供应商起诉清偿。债权人依据新公司法第54条，强行击穿原有股东出资期限利益，要求全体未实缴出资的合伙人提前实缴并在认缴范围内承担连带清偿责任。'
    },
    {
        category: '劳资用工惩罚性合规',
        title: '【典型判例】初创项目核心高管未签书面合同主张双倍工资案',
        summary: '由于早期创业信任缺失，项目推进前6个月未与核心员工及技术经理签署正式书面劳动合同。员工离职后依法提起劳动仲裁。法院认定，即使属于初创种子团队，只要存在实际用工，未在30日内签署书面合同即触发《劳动合同法》第82条惩罚性条款，判令企业补齐数万元双倍工资差额。'
    }
];

// =========================================================================
// 2. 智能化冷启动面试引擎与技能注册表系统
// =========================================================================
const SKILL_REGISTRY = {
    'cost-analysis': {
        title: "⚡ /startup:cost-analysis | 辞职创业机会成本量化",
        desc: "结构化扫描创始人当前薪资水平、启动资金，自动推演期权退出回报损益与出资责任安全边界。",
        questions: [
            { id: "salary", label: "您当前在职放弃的稳定税后年薪是多少？(万元)", type: "number", default: "40" },
            { id: "years", label: "您预计该创业项目的早期深耕年限为几年？(年)", type: "number", default: "3" },
            { id: "invest", label: "个人先期准备自筹投入项目的真金白银是多少？(万元)", type: "number", default: "20" },
            { id: "equity", label: "您在该项目中所占的初始预设持股比例是多少？(%)", type: "number", default: "15" },
            { id: "valuation", label: "项目进行下一轮（A轮或天使轮）预设的投后估值是多少？(万元)", type: "number", default: "3000" }
        ]
    },
    'equity-calculation': {
        title: "⚖️ /startup:equity-calculation | 合伙人股权分配合理性评估",
        desc: "依据合伙人多维生产要素（想法产权、现金出资、全职精力）贡献权重，输出抗死锁控制权审查指引。",
        questions: [
            { id: "idea", label: "核心构想与初始特定技术产权由谁主要提供？", type: "select", options: [
                { val: "0.7", text: "创始人(A方)占绝对主导" },
                { val: "0.3", text: "联合创始人(B方)提供次要支持" },
                { val: "0.5", text: "双方各自提供部分资产，平摊" }
            ]},
            { id: "money", label: "项目前期启动资金的主要实际出资方是谁？", type: "select", options: [
                { val: "0.7", text: "创始人(A方)大头出资(>70%)" },
                { val: "0.3", text: "联合创始人(B方)大头出资" },
                { val: "0.5", text: "双方按50:50等额共同出资" }
            ]},
            { id: "time", label: "双方的全职精力和时间锁定期投入情况如何？", type: "select", options: [
                { val: "1.0", text: "创始人A全职且不拿/拿极低薪；B兼职" },
                { val: "0.5", text: "双方均属兼职试水状态" },
                { val: "1.2", text: "双方均全职闭门研发，承诺四年分期成熟" }
            ]}
        ]
    },
    'compliance-checklist': {
        title: "🏥 /startup:compliance-checklist | 企业法务健康漏洞审计",
        desc: "前置扫描合伙、用工、知产三大核心风险资产，自动化输出差距分析矩阵与矫正路线图。",
        questions: [
            { id: "items", label: "请勾选您目前已经严格落实并签署完备的法务合规项：", type: "checkbox", options: [
                { val: "25", id: "cb1", text: "公司设立与治理：合伙人之间已签署书面《合伙人股权分期成熟回购协议》（防退出带走股权）" },
                { val: "25", id: "cb2", text: "知识产权防线：核心品牌商标已提交注册申请，且技术人员签署了《职务发明及知产归属协议》" },
                { val: "25", id: "cb3", text: "劳资用工安全：所有全职员工入职30天内均签署了书面劳动合同，且包含严密保密与竞业条款" },
                { val: "25", id: "cb4", text: "核心合同风控：对外部核心供应商/大客户的业务合同，使用的是专业律师定制版而非网上盲目下载" }
            ]}
        ]
    }
};

let currentSkill = 'cost-analysis';
let currentQuestionIndex = 0;
let interviewAnswers = {};

// 初始化冷启动面试
function initInterview(skillKey) {
    currentSkill = skillKey;
    currentQuestionIndex = 0;
    interviewAnswers = {};
    
    // 切换 Tab active 状态
    document.querySelectorAll('.tool-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tool-tab-btn')).find(btn => btn.innerHTML.includes(skillKey));
    if(activeBtn) activeBtn.classList.add('active');

    const config = SKILL_REGISTRY[skillKey];
    document.getElementById('skill-title').innerText = config.title;
    document.getElementById('skill-desc').innerText = config.desc;
    document.getElementById('deliverable-preview-area').style.display = 'none';
    document.getElementById('interview-container').style.display = 'block';

    renderQuestion();
}

// 动态渲染当前单步问题
function renderQuestion() {
    const config = SKILL_REGISTRY[currentSkill];
    const totalQ = config.questions.length;
    
    // 更新进度条
    const progressPercent = ((currentQuestionIndex + 1) / totalQ) * 100;
    document.getElementById('progress-indicator').style.width = `${progressPercent}%`;

    // 显隐上一步按钮
    document.getElementById('btn-prev').style.style = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    document.getElementById('btn-next').innerText = (currentQuestionIndex === totalQ - 1) ? "提交并生成交付报告" : "下一步";

    const q = config.questions[currentQuestionIndex];
    const box = document.getElementById('question-box');
    box.innerHTML = `<div class="question-prompt">问题 ${currentQuestionIndex + 1}: ${q.label}</div>`;

    if (q.type === 'number') {
        box.innerHTML += `<input type="number" id="ans-${q.id}" class="interview-input" value="${q.default}">`;
    } else if (q.type === 'select') {
        let optionsHtml = q.options.map(opt => `<option value="${opt.val}">${opt.text}</option>`).join('');
        box.innerHTML += `<select id="ans-${q.id}" class="interview-select">${optionsHtml}</select>`;
    } else if (q.type === 'checkbox') {
        let cbsHtml = q.options.map(opt => `
            <label class="interview-cb-label">
                <input type="checkbox" class="ans-cb-item" value="${opt.val}" data-id="${opt.id}">
                <span>${opt.text}</span>
            </label>
        `).join('');
        box.innerHTML += `<div class="interview-checkbox-group">${cbsHtml}</div>`;
    }
}

function nextQuestion() {
    const config = SKILL_REGISTRY[currentSkill];
    const q = config.questions[currentQuestionIndex];

    // 保存当前步骤数据
    if (q.type === 'checkbox') {
        let selectedVals = [];
        document.querySelectorAll('.ans-cb-item:checked').forEach(cb => {
            selectedVals.push({ id: cb.getAttribute('data-id'), val: parseInt(cb.value) });
        });
        interviewAnswers[q.id] = selectedVals;
    } else {
        const inputEl = document.getElementById(`ans-${q.id}`);
        interviewAnswers[q.id] = parseFloat(inputEl.value) || 0;
    }

    // 步进控制
    if (currentQuestionIndex < config.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // 完成面试，调用编译器输出红圈所公文结构交付物
        compileLegalMemorandum();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

// =========================================================================
// 3. 产物标准化：标准化交付物模板与六维度评估矩阵生成引擎
// =========================================================================
function compileLegalMemorandum() {
    let htmlResult = "";
    
    if (currentSkill === 'cost-analysis') {
        const sal = interviewAnswers['salary'];
        const yr = interviewAnswers['years'];
        const inv = interviewAnswers['invest'];
        const eq = interviewAnswers['equity'];
        const val = interviewAnswers['valuation'];

        const opportunityCost = (sal * yr) + inv;
        const theoreticalValue = val * (eq / 100);
        const netReturn = theoreticalValue - opportunityCost;

        htmlResult = `
            <div class="legal-title-center">《辞职创业沉没成本分析与资本公积风控报告》</div>
            <h3>一、执行摘要 (Executive Summary)</h3>
            <p>· <b>关键发现</b>：发起人放弃未来确定性劳动报酬对价，转而置换初创公司不确定性股权。当前累计机会成本敞口较大。</p>
            <p>· <b>风险等级评价</b>：中度商业摩擦风险 | <b>紧急程度标识</b>：短期内（30天内）完成资本属性合规确认。</p>
            
            <h3>二、详细分析与法律依据 (Detailed Analysis)</h3>
            <p>${LAW_CORES.equity}</p>
            <p>[模型知识] 财务清算分析：您的总沉没机会成本为 <b>${opportunityCost.toFixed(1)} 万元</b>（含出资 ${inv} 万元）。若项目下轮稀释前投后估值顺利触达 ${val} 万元，您的持股期权账面退出价值预计为 <b>${theoreticalValue.toFixed(1)} 万元</b>，绝对损益回报为 <b>${netReturn.toFixed(1)} 万元</b>。</p>
            
            <h3>三、风险评估（六维度评价矩阵）</h3>
            <table class="legal-matrix-table">
                <tr><th>维度</th><th>深度定量/定性解析</th></tr>
                <tr><td>1. 风险定性</td><td>新《公司法》项下股东清算资本认缴虚高与资产击穿风险</td></tr>
                <tr><td>2. 风险敞口</td><td>个人先期自筹投入的 <b>${inv} 万元</b> 现金及五年内资本补足连带责任</td></tr>
                <tr><td>3. 发生概率</td><td>中等（依赖后续外部投资人资金跟进情况）</td></tr>
                <tr><td>4. 可规避性</td><td>高（可通过在章程中设立资本公积溢价或回购条款对冲）</td></tr>
                <tr><td>5. 商业权衡</td><td>放弃短期流动性工资以赌博长期资本化溢价，注意底层现金流防线</td></tr>
                <tr><td>6. 紧迫性</td><td>短期紧迫，需在前置公司设立登记时锁定出资性质</td></tr>
            </table>

            <h3>四、商业摩擦独立评价</h3>
            <p>· <b>操作复杂度</b>：低 | · <b>成本影响</b>：涉及注册资本认缴规模设计，成本可控 | · <b>业务中断风险</b>：无</p>

            <h3>五、针对性矫正建议与行动指南</h3>
            <p><b>【立即执行项（P0）】</b>：立刻在公司章程及合伙人协议中明确，自筹投入的 <b>${inv}万元</b> 属于首期实缴资本而非无偿赠予，并在工商登记中进行时限锁定。</p>
            <p><b>【短期改进项（P1，30天内）】</b>：设置创始人股权分期成熟（Vesting）条款，避免中途退出引发股权锁死纠纷。</p>
            <p><b>【长期规划项（P2，90天内）】</b>：接入元典或北大法宝进行同赛道竞品清算回购纠纷的判例检索，完善退出闭环。</p>
            <br>
            <p style="font-size:11px; color:#64748B;">⚠️ <b>免责声明</b>：本报告为AI辅助分析草稿，不构成法律意见，不替代律师专业审查。使用前请务必咨询执业律师，核实所有引用来源，并对最终决策承担专业责任。</p>
        `;
    } 
    else if (currentSkill === 'equity-calculation') {
        const idea = interviewAnswers['idea'];
        const money = interviewAnswers['money'];
        const time = interviewAnswers['time'];

        const totalA = (idea * 0.3) + (money * 0.3) + (time * 0.4);
        const shareA = (totalA / (totalA + 0.6)) * 100; // 模拟加权比值
        const isDeadlock = shareA < 66.7;

        htmlResult = `
            <div class="legal-title-center">《合伙人股权分配合理性审查与控制权防死锁备忘录》</div>
            <h3>一、执行摘要 (Executive Summary)</h3>
            <p>· <b>关键发现</b>：基于想法、资金、全职精力的多维要素建模，创始人建议占股为 <b>${shareA.toFixed(1)}%</b>。</p>
            <p>· <b>风险等级评价</b>：${isDeadlock ? '🔴 高危公司治理死锁状态' : '🟢 治理结构安全线以上'} | <b>紧急程度</b>：立即执行（P0）</p>
            
            <h3>二、详细分析与法律依据 (Detailed Analysis)</h3>
            <p>${LAW_CORES.equity}</p>
            <p>[案例检索] 依据最高法类案指导规则，初创企业均分股权（如50:50或33:33:33）在面对后续融资、重大资产处置分歧时，100%引发治理僵局。新公司法赋予了章程极大自治权，表决权与分红权可分离配置。</p>
            
            <h3>三、风险评估（六维度评价矩阵）</h3>
            <table class="legal-matrix-table">
                <tr><th>维度</th><th>深度定量/定性解析</th></tr>
                <tr><td>1. 风险定性</td><td>股权平分或大股东未达2/3绝对控制权导致的章程修改否决死锁</td></tr>
                <tr><td>2. 风险敞口</td><td>核心经营决策权、公章控制权及后续融资一票否决权冲突</td></tr>
                <tr><td>3. 发生概率</td><td>高（多发于项目上线6-18个月）</td></tr>
                <tr><td>4. 可规避性</td><td>极高（前置通过AB股或持股平台收拢表决权）</td></tr>
                <tr><td>5. 商业权衡</td><td>需平衡联合创始人的心理预期与公司最高决策效率</td></tr>
                <tr><td>6. 紧迫性</td><td>立即执行，股权章程一旦登记极难零成本调整</td></tr>
            </table>

            <h3>四、针对性矫正建议与行动指南</h3>
            <p><b>【立即执行项（P0）】</b>：拒绝推行均分主义股权架构。大股东表决权必须越过51%（相对控制）或66.7%（绝对控制）法定生死线。</p>
            <p><b>【短期改进项（P1，30天内）】</b>：设立有限合伙企业（LLP）作为持股平台，由创始人担任GP（普通合伙人），将员工及联创的表决权统一收拢。</p>
            <br>
            <p style="font-size:11px; color:#64748B;">⚠️ <b>免责声明</b>：本报告为AI辅助分析草稿，不构成法律意见，不替代律师专业审查。</p>
        `;
    } 
    else if (currentSkill === 'compliance-checklist') {
        const items = interviewAnswers['items'] || [];
        const score = items.length * 25;

        htmlResult = `
            <div class="legal-title-center">《初创企业法务合规差距分析与漏洞加固审计报告》</div>
            <h3>一、执行摘要 (Executive Summary)</h3>
            <p>· <b>关键发现</b>：企业法务健康审计得分为 <b>${score} / 100分</b>。存在显著的局部合规缺口。</p>
            <p>· <b>风险等级评价</b>：${score < 50 ? '🔴 高危诉讼状态' : '🟡 中度风险隐患'} | <b>紧急程度</b>：立即排查</p>
            
            <h3>二、详细分析与法律依据 (Detailed Analysis)</h3>
            <p>${LAW_CORES.labor}</p>
            <p>${LAW_CORES.ip}</p>
            
            <h3>三、风险评估（六维度评价矩阵）</h3>
            <table class="legal-matrix-table">
                <tr><th>维度</th><th>深度定量/定性解析</th></tr>
                <tr><td>1. 风险定性</td><td>劳动用工未签合同双倍工资追偿风险、核心品牌商标遭同行恶意抢注下架风险</td></tr>
                <tr><td>2. 风险敞口</td><td>未签合同员工总月薪差额、产品下架重命名和渠道断裂的直接经济损失</td></tr>
                <tr><td>3. 发生概率</td><td>极高（属于初创期前三大高发司法诉讼类型）</td></tr>
                <tr><td>4. 可规避性</td><td>高（通过标准劳动合同模板与上线前知产检索拦截）</td></tr>
                <tr><td>5. 商业权衡</td><td>法务前置投入成本极低，但爆发纠纷后商业断裂代价极高</td></tr>
                <tr><td>6. 紧迫性</td><td>立即（产品上线及员工入职30天内必办）</td></tr>
            </table>

            <h3>四、行动建议路线图</h3>
            <p><b>【立即执行项（P0）】</b>：立刻全面清查全职及兼职技术研发人员的劳动合同与《知产归属保密协议》签署状态，严防离职带走核心源码。</p>
            <p><b>【短期改进项（P1，30天内）】</b>：前往国家知识产权局系统进行主品牌商标的全类别可注册性检索，拦截恶意抢注风险。</p>
            <br>
            <p style="font-size:11px; color:#64748B;">⚠️ <b>免责声明</b>：本报告为AI辅助分析草稿，不构成法律意见，不替代律师专业审查。</p>
        `;
    }

    // 渲染结果并展示预览舱
    document.getElementById('interview-container').style.display = 'none';
    const previewArea = document.getElementById('deliverable-preview-area');
    document.getElementById('memo-output-render').innerHTML = htmlResult;
    previewArea.style.display = 'block';
    
    // 平滑滚动到产物区域
    previewArea.scrollIntoView({ behavior: 'smooth' });
}

// 一键复制交付产物
function copyDeliverable() {
    const text = document.getElementById('memo-output-render').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 标准法务备忘录公文已复制到您的剪贴板，可完美转发至微信、飞书或钉钉团队协同群！');
    }).catch(() => {
        alert('复制失败，请手动选择框内文本进行复制。');
    });
}

// =========================================================================
// 4. 统一路由及全局事件处理（修复平滑滚动与高亮死锁）
// =========================================================================
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 初始化加载与判例库渲染
document.addEventListener('DOMContentLoaded', () => {
    initInterview('cost-analysis'); // 默认冷启动第一个技能
    
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
// 5. 法律声明、隐私政策、使用条款通用弹窗机制
// =========================================================================
const legalTexts = {
    disclaimer: {
        title: "免责声明 (Disclaimer)",
        content: `
            <h4>一、数字化模型性质声明</h4>
            <p>本工作台（FounderLegal）所包含的各项商业测算工具及大模型多步冷启动问卷均系基于特定法律风控逻辑进行的前置推演。<strong>上述所有内容仅供创业者内部探讨及项目早期风险自查参考，不构成任何具备法律效力的正式法律意见、法务判决预测、或专业律师的个案执业诊断结论。</strong></p>
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
