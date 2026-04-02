// script.js

// ==========================================
// 1. FIREBASE CONFIGURATION 
// ==========================================
let db;
try {
    if (typeof CONFIG === 'undefined') {
        console.error("CRITICAL: config.js is missing!");
        showToast("Config Missing! Check Console.");
    } else {
        firebase.initializeApp(CONFIG.firebase);
        db = firebase.firestore();
        console.log("Firebase initialized.");
    }
} catch (error) {
    console.error("Firebase Error:", error);
}

// ==========================================
// 2. DATA (Edit your Portfolio here)
// ==========================================
const localData = {
    skills: [
        { category: 'AI & ML', items: [
            { name: 'Deep Learning', level: 90 },
            { name: 'Generative AI', level: 85 },
            { name: 'MLOps', level: 75 }
        ]},
        { category: 'Programming', items: [
            { name: 'Python', level: 95 },
            { name: 'SQL / NoSQL', level: 80 },
            { name: 'C++', level: 85 }
        ]}
    ],
    projects: [
        {
            title: 'Sarathi AI',
            desc: 'A multimodal AI-powered learning companion assisting students with personalized content.',
            category: 'Deep Learning',
            stack: ['GenAI', 'Python', 'React']
        },
        {
            title: 'CinaMatch AI',
            desc: 'NLP-based movie recommendation system utilizing content-based filtering and sentiment analysis.',
            category: 'NLP', 
            stack: ['Python', 'NLP', 'Flask', 'Sklearn']
        },
        {
            title: 'Heart Disease Prediction',
            desc: 'Medical diagnosis support tool using Machine Learning classifiers (KNN, SVM).',
            category: 'Data Science',
            stack: ['Scikit-Learn', 'Pandas']
        }
    ],
    hackathons: [
        {
            title: 'Kharagpur Data Science Hackathon 2026',
            role: 'Team Lead (SSD)',
            desc: 'Developed an innovative solution for predictive analytics. Competed against top teams nationally.',
            year: 'Jan 2026',
            badge: 'Finalist'
        },
        {
            title: 'Conclave Hackathon 2026', 
            role: 'Team Lead',
            desc: 'Built a real-time solution addressing key industry problems using AI and Data Science.',
            year: 'Feb 2026',
            badge: 'Participant' 
        }
    ]
};

// ==========================================
// 3. LOGIC: Fetch & Render
// ==========================================

async function loadContent() {
    if (!db) { renderLocalData(); return; }

    try {
        // Fetch Skills
        const skillsSnap = await db.collection('skills').get();
        if (!skillsSnap.empty) {
            let dbSkills = [];
            skillsSnap.forEach(doc => dbSkills.push(doc.data()));
            renderSkills(dbSkills.sort((a,b) => a.category.localeCompare(b.category)));
        } else { renderSkills(localData.skills); }

        // Fetch Projects
        const projectsSnap = await db.collection('projects').get();
        if (!projectsSnap.empty) {
            let dbProjects = [];
            projectsSnap.forEach(doc => dbProjects.push(doc.data()));
            renderProjects(dbProjects);
        } else { renderProjects(localData.projects); }

        // Fetch Hackathons
        const hacksSnap = await db.collection('hackathons').get();
        if (!hacksSnap.empty) {
            let dbHacks = [];
            hacksSnap.forEach(doc => dbHacks.push(doc.data()));
            renderHackathons(dbHacks);
        } else { renderHackathons(localData.hackathons); }

        showToast("✅ Data loaded from Cloud");

    } catch (e) {
        console.error("DB Error:", e);
        renderLocalData();
    }
}

function renderLocalData() {
    renderSkills(localData.skills);
    renderProjects(localData.projects);
    renderHackathons(localData.hackathons);
}

// Render Helper Functions
function renderSkills(data) {
    const container = document.getElementById('skills-grid');
    if(container) {
        container.innerHTML = '';
        data.forEach(cat => {
            let html = `<div class="skill-category"><div style="color:var(--accent); margin-bottom:1rem; font-weight:bold;">${cat.category}</div>`;
            cat.items.forEach(item => {
                html += `
                <div style="margin-bottom:1rem;">
                    <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                        <span>${item.name}</span><span>${item.level}%</span>
                    </div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${item.level}%"></div></div>
                </div>`;
            });
            html += `</div>`;
            container.innerHTML += html;
        });
    }
}

function renderProjects(data) {
    const container = document.getElementById('projects-grid');
    if(container) {
        container.innerHTML = '';
        data.forEach(proj => {
            const stackHtml = proj.stack ? proj.stack.map(s => `<span class="tech-badge">${s}</span>`).join('') : '';
            const html = `
            <div class="project-card">
                <div class="project-img"><i class="fas fa-laptop-code"></i></div>
                <div class="project-content">
                    <div style="color:var(--accent); font-size:0.8rem; text-transform:uppercase; margin-bottom:0.5rem;">${proj.category}</div>
                    <h3 style="color:white; margin-bottom:0.5rem;">${proj.title}</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem; flex-grow:1; margin-bottom:1rem;">${proj.desc}</p>
                    <div>${stackHtml}</div>
                </div>
            </div>`;
            container.innerHTML += html;
        });
    }
}

function renderHackathons(data) {
    const container = document.getElementById('hackathon-grid');
    if(container) {
        container.innerHTML = '';
        data.forEach(hack => {
            const html = `
            <div class="project-card" style="min-height:auto;">
                <div class="project-content">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                        <span style="color:var(--accent); font-weight:bold;">${hack.year}</span>
                        <span class="tech-badge" style="background:var(--accent); color:white;">${hack.badge}</span>
                    </div>
                    <h3 style="color:white; margin-bottom:0.5rem;">${hack.title}</h3>
                    <p style="color:white; font-size:0.9rem; margin-bottom:0.5rem;"><strong>Role:</strong> ${hack.role}</p>
                    <p style="color:var(--text-muted); font-size:0.9rem;">${hack.desc}</p>
                </div>
            </div>`;
            container.innerHTML += html;
        });
    }
}

function filterProjects(filter) {
    loadContent(); 
}

// ==========================================
// 4. SYNC FUNCTION (Upload to Firebase)
// ==========================================
window.syncData = async function() {
    if (!db) return alert("Firebase not initialized!");
    if (prompt("Admin Password:") !== "admin123") return alert("Wrong Password");

    showToast("⏳ Uploading...");
    try {
        const batch = db.batch();
        localData.skills.forEach(cat => batch.set(db.collection('skills').doc(cat.category), cat));
        localData.projects.forEach(proj => batch.set(db.collection('projects').doc(proj.title), proj));
        localData.hackathons.forEach(hack => batch.set(db.collection('hackathons').doc(hack.title), hack));
        
        await batch.commit();
        alert("✅ Data Synced!");
        location.reload();
    } catch (e) {
        console.error(e);
        alert("❌ Sync Failed: " + e.message);
    }
};

// ==========================================
// 5. CONTACT FORM LOGIC (NEW)
// ==========================================
window.submitForm = async function(e) {
    e.preventDefault(); 

    if (!db) return alert("Firebase not connected! Check keys.");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const btn = document.querySelector('.contact-btn');

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
        await db.collection('messages').add({
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });

        showToast("✅ Message Sent Successfully!");
        document.getElementById('contactForm').reset();
        
    } catch (error) {
        console.error("Error sending message:", error);
        showToast("❌ Failed to send message.");
        alert("Error: " + error.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

function showToast(msg) {
    const t = document.getElementById('status-toast');
    if(t) { t.innerText = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000); }
}

// ==========================================
// 6. INITIALIZE
// ==========================================
loadContent();

// Particle Canvas
const canvas = document.getElementById('particle-canvas');
if(canvas) {
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let particles = [];
    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5); this.vy = (Math.random() - 0.5); this.size = Math.random() * 2 + 1; }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; }
        draw() { c.beginPath(); c.arc(this.x, this.y, this.size, 0, Math.PI * 2); c.fillStyle = '#3b82f6'; c.fill(); }
    }
    function init() { particles = []; for (let i = 0; i < 50; i++) particles.push(new Particle()); }
    function animate() { c.clearRect(0,0,canvas.width,canvas.height); particles.forEach((p,i)=>{p.update();p.draw();for(let j=i+1;j<particles.length;j++){const d=Math.hypot(p.x-particles[j].x,p.y-particles[j].y);if(d<150){c.beginPath();c.strokeStyle=`rgba(59,130,246,${1-d/150})`;c.moveTo(p.x,p.y);c.lineTo(particles[j].x,particles[j].y);c.stroke();}}});requestAnimationFrame(animate); }
    init(); animate();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
}

// GPA Chart
const gpaCtx = document.getElementById('gpaChart');
if(gpaCtx) {
    new Chart(gpaCtx.getContext('2d'), {
        type: 'doughnut',
        data: { datasets: [{ data: [8.2, 1.8], backgroundColor: ['#d946ef', 'rgba(255,255,255,0.05)'], borderWidth: 0, cutout: '85%', borderRadius: 20 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { animateScale: true } }
    });
}