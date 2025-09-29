// loadMarkdownModule.js
// 共用函式：建立 tab，載入對應的 Markdown

function initMarkdownModule(tabsId, containerId, items) {
  const tabsContainer = document.getElementById(tabsId);
  const mdContainer = document.getElementById(containerId);

  if (!tabsContainer || !mdContainer) return;

  // 動態建立 tab 按鈕
  items.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (idx === 0 ? " active" : "");
    btn.textContent = item.name;
    btn.setAttribute("data-file", item.file);
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-controls", containerId);
    btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");

    btn.addEventListener("click", (e) => {
      // 移除舊 active
      tabsContainer.querySelectorAll("button").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      // 設定新 active
      e.target.classList.add("active");
      e.target.setAttribute("aria-selected", "true");

      loadMarkdown(e.target.getAttribute("data-file"));
    });

    tabsContainer.appendChild(btn);
  });

  // 預設載入第一個
  if (items.length > 0) {
    loadMarkdown(items[0].file);
  }

  // 讀取並渲染 Markdown
  function loadMarkdown(filePath) {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error("載入失敗: " + filePath);
        return res.text();
      })
      .then((md) => {
        mdContainer.innerHTML = marked.parse(md);
      })
      .catch((err) => {
        mdContainer.innerHTML = `<p style="color:red;">⚠️ ${err.message}</p>`;
      });
  }
}

function initMarkdownModule(tabsId, containerId, tabs) {
  const tabsContainer = document.getElementById(tabsId);
  const container = document.getElementById(containerId);

  tabs.forEach((tab, idx) => {
    const btn = document.createElement("button");
    btn.textContent = tab.name;
    btn.classList.add("tab-btn"); // 確保使用原本的樣式
    btn.onclick = () => {
      // 先移除其他 tab 的 active
      tabsContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      // 新的 tab 加上 active
      btn.classList.add("active");
      loadMd(tab.file);
    };
    tabsContainer.appendChild(btn);
    if (idx === 0) {
      btn.classList.add("active");
      loadMd(tab.file); // 預設載入第一個
    }
  });

  function loadMd(file) {
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error("檔案不存在");
        return res.text();
      })
      .then(md => {
        if (!md.trim()) {
          container.innerHTML = `
            <div style="text-align:center; padding:20px;">
              <img src="images/WEBSTE_UNDER_CONSTRUCTIONN.webp" alt="施工中" style="max-width:720px; width:60%; margin:0 auto 16px; display:block;">
              <p style="font-size:18px; color:#666;">此內容正在建置中，敬請期待！</p>
            </div>`;
        } else {
          container.innerHTML = marked.parse(md);
        }
      })
      .catch(err => {
        container.innerHTML = `
          <div style="text-align:center; padding:20px;">
            <img src="images/WEBSTE_UNDER_CONSTRUCTIONN.webp" alt="施工中" style="max-width:720px; width:60%; margin:0 auto 16px; display:block;">
            <p style="font-size:18px; color:#666;">此模組內容尚未完成 (${file})</p>
          </div>`;
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ===== Module 3: 常見外科手術 =====
  const SURG_TABS = [
    { name: "肝膽外科", file: "md/surgery/liver.md" },
    { name: "胰臟外科", file: "md/surgery/pancreas.md" },
    { name: "大腸直腸外科", file: "md/surgery/colorectal.md" },
    { name: "胸腔外科", file: "md/surgery/thoracic.md" },
    { name: "泌尿外科", file: "md/surgery/uro.md" }
  ];
  initMarkdownModule("surgTabs", "surgMdContainer", SURG_TABS);

  // ===== Module 4: 常見引流管 =====
  fetch("md/drain/drainage.md")
    .then(res => res.text())
    .then(md => {
      document.getElementById("drainMdContainer").innerHTML = marked.parse(md);
    })
    .catch(err => {
      document.getElementById("drainMdContainer").innerHTML = `
        <div style="text-align:center; padding:20px;">
          <img src="images/WEBSTE_UNDER_CONSTRUCTIONN.webp" alt="施工中" style="max-width:720px; width:60%; margin:0 auto 16px; display:block;">
          <p style="font-size:18px; color:#666;">常見引流管內容尚未完成</p>
        </div>`;
    });

  // ===== Module 5: 常見技術 =====
  const TECH_TABS = [
    { name: "A-line", file: "md/tech/aline.md" },
    { name: "CVP Level", file: "md/tech/cvp.md" },
    { name: "HFNC", file: "md/tech/hfnc.md" },
    { name: "BPAP", file: "md/tech/bpap.md" },
    { name: "Ventilator", file: "md/tech/ventilator.md" },
    { name: "CRRT", file: "md/tech/crrt.md" },
    { name: "Flowtrac", file: "md/tech/flowtrac.md" },
    { name: "PICO", file: "md/tech/pico.md" },
    { name: "Swan-ganz", file: "md/tech/swanganz.md" },
  ];
  initMarkdownModule("techTabs", "techMdContainer", TECH_TABS);

  // ===== Module 6: 常見臨床檢驗 =====
  const LAB_TABS = [
    { name: "藥物血中濃度 TDM", file: "md/lab/tdm.md" },
    { name: "細菌培養報告 SIR", file: "md/lab/sir.md" },
    { name: "常見血品", file: "md/lab/bt.md" },
    { name: "Inhalation", file: "md/lab/inhalation.md" }
  ];
  initMarkdownModule("labTabs", "labMdContainer", LAB_TABS);

  // ===== Module 7: 常見術後合併症 =====
  const COMP_TABS = [
    { name: "肺擴張不全 (Atelectasis)", file: "md/comp/atelectasis.md" },
    { name: "急性出血 (Acute Hemorrhage)", file: "md/comp/hemorrhage.md" },
    { name: "敗血症 (Sepsis)", file: "md/comp/sepsis.md" },
    { name: "敗血性休克 (Septic Shock)", file: "md/comp/septic_shock.md" },
    { name: "急性心肌梗塞 (AMI)", file: "md/comp/ami.md" },
    { name: "肺栓塞 (Pulmonary Embolism)", file: "md/comp/pe.md" }
  ];
  initMarkdownModule("compTabs", "compMdContainer", COMP_TABS);

});
