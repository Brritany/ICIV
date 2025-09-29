# ICIV — Intensive Care Information & Visualization

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://Brritany.github.io/ICIV/)
[![License](https://img.shields.io/github/license/Brritany/ICIV)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Brritany/ICIV?style=social)](https://github.com/Brritany/ICIV/stargazers)
[![Forks](https://img.shields.io/github/forks/Brritany/ICIV?style=social)](https://github.com/Brritany/ICIV/network/members)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Brritany.ICIV)

**ICIV** (Intensive Care Information & Visualization) is an open-source platform designed to empower ICU teams with accessible, extensible, and reliable tools for safer care and smarter decisions.

👉 **Live Demo:** <https://Brritany.github.io/ICIV/>

---

## Features

### 💉 IV Compatibility Matrix

- Interactive drug compatibility visualization  
- Data-driven from `data/CompatibilityMatrix.csv`  
- Grouped drug categories (Sedation, Inotropic, Others)  
- Dropdown selection with cross-highlighting  
- Hover crosshair effect  
- Color-coded compatibility:  
  - **Y** Compatible  
  - **N** Incompatible  
  - **!** Variable Results  
  - **?** No Data  
  - **-** Same Drug  
- Metadata (last updated, sources)  

---

### 📒 Drug Quick Sheet

- JSON-driven drug reference from `data/DrugInfo.json`  
- Dynamic tabs for each drug  
- Displays:
  - Generic and brand names
  - Mechanism of action
  - Indications
  - Dosing
  - Adverse effects
  - Monitoring
  - Contraindications & cautions
  - Sources
- Color-coded categorization:
  - Vasopressors (🔴 red)
  - Sedatives (🔵 blue)
  - Opioids (🟢 green)
  - Neuromuscular Blockers (🟣 purple)
  - Reversal Agents (🟠 orange)
  - Vasodilators (🟦 teal)
  - Anticoagulants (⚫ gray)

---

### 🔪 Surgical Procedures

- Markdown-driven surgical knowledge base
- Specialty tabs (Hepatobiliary, Pancreatic, Colorectal, Thoracic, Urologic, etc.)
- Includes **pre-op evaluation, intra-op techniques, post-op care, and complications**
- Rich illustrations and diagrams

---

### 🩸 Common Drains

- Interactive references for common ICU and surgical drains
- Includes indication, management, troubleshooting, and removal criteria

---

### ⚙️ ICU Technologies

- Reference sheets for common ICU monitoring and support technologies
- Covers mechanical ventilation, hemodynamic monitoring, CRRT, ECMO, and more

---

### 🧪 Clinical Laboratory Tests

- Quick reference for ICU-relevant lab panels
- Normal ranges, interpretation, and clinical caveats
- Markdown-driven and expandable

---

### 🏥 Postoperative Complications

- Interactive guide to common surgical complications:
  - Atelectasis
  - Acute bleeding
  - Sepsis / Septic shock
  - Acute myocardial infarction (AMI)
  - Pulmonary embolism
- Linked to management guidelines and references

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)  
- **Markdown rendering:** [Marked.js](https://marked.js.org/) + GitHub Markdown CSS  
- **Data parsing:** [PapaParse](https://www.papaparse.com/)  
- **Hosting:** GitHub Pages  

---

## 📜 License

This project follows a **dual license model**:

- **Source Code** → [MIT License](LICENSE) (open-source, commercial use allowed)  
- **Medical Content** → [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (educational, non-commercial use, attribution required)  
- **Proprietary Databases** (e.g., Micromedex®, UpToDate, OpenEvidence) → Not licensed, users must obtain their own access rights.  

👉 See [NOTICE.md](NOTICE.md) for a clear license summary.  

---

## 👩‍⚕️ Acknowledgments

- ICU nurses, pharmacists, and physicians for domain expertise  
- [Micromedex® IV Compatibility (Merative™)](https://www.micromedexsolutions.com/)  
- [UpToDate](https://www.uptodate.com/) for medical references  
- [OpenEvidence](https://openevidence.com/) for clinical decision support  
- Open-source contributors and community reviewers  

---

⭐ If you find ICIV helpful, please consider giving it a **star** on GitHub!
