/**
 * 三國演義關係網路圖 - 核心交互與 D3.js 力導向圖渲染邏輯
 */

document.addEventListener("DOMContentLoaded", () => {
  // === 1. 初始化 DOM 元素 ===
  const canvasContainer = document.getElementById("graph-canvas");
  const sidebar = document.getElementById("info-sidebar");
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
  const sidebarInfo = document.getElementById("sidebar-info");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  
  const infoTitle = document.getElementById("info-title");
  const infoBadge = document.getElementById("info-badge");
  const infoType = document.getElementById("info-type");
  const infoMetaContainer = document.getElementById("info-meta-container");
  const infoMetaVal = document.getElementById("info-meta-val");
  const infoDesc = document.getElementById("info-desc");
  const infoGames = document.getElementById("info-games");
  const infoConnCount = document.getElementById("info-conn-count");
  const infoConnections = document.getElementById("info-connections");

  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const sliderLinkDist = document.getElementById("slider-link-distance");
  const sliderCharge = document.getElementById("slider-charge-strength");
  const sliderCollide = document.getElementById("slider-collide-strength");
  
  const valLinkDist = document.getElementById("val-link-distance");
  const valCharge = document.getElementById("val-charge-strength");
  const valCollide = document.getElementById("val-collide-strength");

  const toggleLabels = document.getElementById("toggle-labels");
  const btnRestartSim = document.getElementById("btn-restart-sim");
  
  const btnZoomIn = document.getElementById("btn-zoom-in");
  const btnZoomOut = document.getElementById("btn-zoom-out");
  const btnZoomReset = document.getElementById("btn-zoom-reset");
  
  const tooltip = document.getElementById("tooltip");

  // === 2. 數據預處理 (度數與屬性計算) ===
  const nodes = JSON.parse(JSON.stringify(THREE_KINGDOMS_DATA.nodes));
  const links = JSON.parse(JSON.stringify(THREE_KINGDOMS_DATA.links));

  // 計算度數 (Degree) - 每個節點連線的數量
  const degreeMap = {};
  nodes.forEach(n => degreeMap[n.id] = 0);
  links.forEach(l => {
    degreeMap[l.source]++;
    degreeMap[l.target]++;
  });

  // 找出人物最大度數與事件最大度數
  let maxCharDegree = 1;
  let maxEventDegree = 1;
  nodes.forEach(n => {
    n.degree = degreeMap[n.id] || 0;
    if (n.type === "character") {
      if (n.degree > maxCharDegree) maxCharDegree = n.degree;
    } else {
      if (n.degree > maxEventDegree) maxEventDegree = n.degree;
    }
  });

  // 設定節點半徑與色彩屬性
  nodes.forEach(n => {
    if (n.type === "character") {
      // 人物基本半徑 18px，加上度數加成（最大 32px）
      n.radius = 18 + (n.degree / maxCharDegree) * 12;
      
      // 人物顏色邏輯：
      // 1. 如果牽涉事件很少，使用該陣營的基本色。
      // 2. 如果牽涉事件非常多（度數高），其色彩往紫色/霓虹紅漸變，顯得十分特別。
      n.color = getCharacterColor(n.group, n.degree, maxCharDegree);
    } else {
      // 事件基本半徑 12px，牽涉的人愈多圈圈愈大（每多一人連線半徑增加 5px，最大 45px）
      n.radius = 12 + n.degree * 4.5;
      n.color = "#a0aec0"; // 事件固定底色
    }
  });

  // 取得人物顏色的輔助函數
  function getCharacterColor(group, degree, maxDegree) {
    // 陣營基礎色 (RGB格式)
    const baseColors = {
      "蜀": [0, 245, 212],    // 青綠色
      "魏": [58, 134, 240],   // 藍色
      "吳": [255, 0, 84],     // 粉紅色
      "群": [255, 190, 11]    // 金色
    };
    
    // 特別高亮色 (極高參與度時融合成霓虹紫/紫紅色)
    const specialColor = [192, 132, 252]; // #c084fc
    
    const base = baseColors[group] || [200, 200, 200];
    const ratio = degree / maxDegree; // 參與度佔最大值的比例

    // 當比例大於 0.6 時，色彩逐漸混入特別高亮色
    if (ratio > 0.4) {
      const blendRatio = (ratio - 0.4) / 0.6; // 0 到 1 之間的混合係數
      const r = Math.round(base[0] * (1 - blendRatio) + specialColor[0] * blendRatio);
      const g = Math.round(base[1] * (1 - blendRatio) + specialColor[1] * blendRatio);
      const b = Math.round(base[2] * (1 - blendRatio) + specialColor[2] * blendRatio);
      return `rgb(${r}, ${g}, ${b})`;
    }
    
    return `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
  }

  // === 3. 初始化 D3.js 畫布與力導向模擬 ===
  let width = canvasContainer.clientWidth;
  let height = canvasContainer.clientHeight;

  // 建立 SVG
  const svg = d3.select("#graph-canvas")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // 建立箭頭定義 (用於高亮指引，雖然此圖無向但可用於連線光暈)
  const defs = svg.append("defs");
  
  // 定義節點發光陰影濾鏡
  const filter = defs.append("filter")
    .attr("id", "glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");
  
  filter.append("feGaussianBlur")
    .attr("stdDeviation", "4")
    .attr("result", "blur");
  
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "blur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // 建立一個主要繪圖容器群組以支援縮放 (Zoom)
  const mainGroup = svg.append("g").attr("class", "main-group");

  // 設定縮放功能
  const zoom = d3.zoom()
    .scaleExtent([0.2, 5])
    .on("zoom", (event) => {
      mainGroup.attr("transform", event.transform);
    });

  svg.call(zoom);

  // 初始化力學模擬器，加入 alphaDecay(0.03) 以優化 200 個節點在大網下的收斂效能
  const simulation = d3.forceSimulation(nodes)
    .alphaDecay(0.03)
    .force("link", d3.forceLink(links).id(d => d.id).distance(parseFloat(sliderLinkDist.value)))
    .force("charge", d3.forceManyBody().strength(parseFloat(sliderCharge.value)))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.radius + 15).iterations(2)); // 加大碰撞間距，防止 410 個節點擠成一團

  // === 4. 繪製連線與節點 ===
  
  // 1. 繪製連線 (Edges)
  const link = mainGroup.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "link");

  // 2. 建立節點群組 (Nodes)
  const node = mainGroup.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
    );

  // 3. 在節點中添加形狀
  // 人物節點使用圓形，外框有發光感
  node.filter(d => d.type === "character")
    .append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => d.color)
    .attr("stroke", d => d3.rgb(d.color).brighter(0.8))
    .attr("stroke-width", d => d.degree > maxCharDegree * 0.6 ? 3 : 1.5)
    .style("filter", d => d.degree > maxCharDegree * 0.6 ? "url(#glow)" : "none");

  // 事件節點使用雙重圓圈（代表其衍生了各種故事與多位人物的交點）
  const eventNodeG = node.filter(d => d.type === "event");
  
  eventNodeG.append("circle")
    .attr("r", d => d.radius)
    .attr("fill", "rgba(160, 174, 192, 0.15)")
    .attr("stroke", "#a0aec0")
    .attr("stroke-width", 2)
    .style("stroke-dasharray", "3,3"); // 虛線外環

  eventNodeG.append("circle")
    .attr("r", d => d.radius - 5 > 6 ? d.radius - 5 : 6)
    .attr("fill", "#a0aec0")
    .attr("stroke", "#e2e8f0")
    .attr("stroke-width", 1.5);

  // 4. 添加文字標籤
  const labels = node.append("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.type === "character" ? ".35em" : ".35em") // 置中
    .text(d => d.id)
    .style("pointer-events", "none")
    .style("font-size", d => d.type === "character" ? "12px" : "10px")
    .style("font-weight", d => d.type === "character" ? "700" : "500");

  // === 5. 設定力學更新 (Tick) 動作 ===
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    // 當 alpha 低於 0.01 時自動停止模擬，釋放 CPU 負載
    if (simulation.alpha() < 0.01) {
      simulation.stop();
      console.log("D3 Simulation auto-stopped for performance optimization.");
    }
  });

  // === 6. 互動效果：Hover 高亮、點擊詳情 ===
  
  let selectedNode = null;

  // 懸停事件
  node.on("mouseenter", function(event, d) {
    // 顯示 Tooltip
    tooltip.style.opacity = "1";
    tooltip.innerHTML = `<strong>${d.id}</strong> (${d.type === 'character' ? d.group + '營人物' : '歷史事件'})<br>參與度：${d.degree} 個連線`;
    
    // 如果沒有點擊鎖定某個節點，則懸停高亮
    if (!selectedNode) {
      highlightConnections(d);
    }
  })
  .on("mousemove", function(event) {
    // 浮動 Tooltip 跟隨滑鼠
    tooltip.style.left = (event.pageX + 15) + "px";
    tooltip.style.top = (event.pageY - 15) + "px";
  })
  .on("mouseleave", function() {
    // 隱藏 Tooltip
    tooltip.style.opacity = "0";
    
    // 如果沒有點擊鎖定某個節點，則還原
    if (!selectedNode) {
      resetHighlights();
    }
  })
  .on("click", function(event, d) {
    event.stopPropagation();
    
    // 點擊節點
    if (selectedNode === d) {
      // 再次點擊相同節點，關閉詳情並重設高亮
      selectedNode = null;
      sidebar.classList.add("collapsed");
      resetHighlights();
    } else {
      selectedNode = d;
      showDetailInSidebar(d);
      highlightConnections(d);
      
      // 平移畫布將選中節點置中
      centerNode(d);
    }
  });

  // 點擊畫布空白處重置
  svg.on("click", () => {
    selectedNode = null;
    sidebar.classList.add("collapsed");
    resetHighlights();
  });

  // 點擊關閉側邊欄按鈕
  closeSidebarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedNode = null;
    sidebar.classList.add("collapsed");
    resetHighlights();
  });

  // 高亮直接相連的節點與線條
  function highlightConnections(focusNode) {
    // 尋找直接關聯的節點 ID 集合
    const connectedNodeIds = new Set();
    connectedNodeIds.add(focusNode.id);
    
    links.forEach(l => {
      if (l.source.id === focusNode.id) connectedNodeIds.add(l.target.id);
      if (l.target.id === focusNode.id) connectedNodeIds.add(l.source.id);
    });

    // 1. 高亮連線
    link
      .classed("highlighted", l => l.source.id === focusNode.id || l.target.id === focusNode.id)
      .classed("fade-out", l => l.source.id !== focusNode.id && l.target.id !== focusNode.id);

    // 2. 高亮節點與文字標籤
    node
      .classed("fade-out", n => !connectedNodeIds.has(n.id));

    labels
      .classed("fade-out", n => !connectedNodeIds.has(n.id));
      
    // 給選中節點特殊的呼吸濾鏡
    node.selectAll("circle")
      .style("filter", n => {
        if (n.id === focusNode.id) return "url(#glow)";
        return n.degree > maxCharDegree * 0.6 && n.type === 'character' ? "url(#glow)" : "none";
      })
      .attr("stroke-width", n => {
        if (n.id === focusNode.id) return 4;
        return n.degree > maxCharDegree * 0.6 && n.type === 'character' ? 3 : 1.5;
      });
  }

  // 重置所有高亮狀態
  function resetHighlights() {
    link
      .classed("highlighted", false)
      .classed("fade-out", false);
    
    node
      .classed("fade-out", false);

    labels
      .classed("fade-out", false);

    node.selectAll("circle")
      .style("filter", n => n.degree > maxCharDegree * 0.6 && n.type === 'character' ? "url(#glow)" : "none")
      .attr("stroke-width", n => n.degree > maxCharDegree * 0.6 && n.type === 'character' ? 3 : 1.5);
  }

  // 將選中節點居中的平移動畫
  function centerNode(d) {
    const scale = d3.zoomTransform(svg.node()).k; // 保持目前的縮放比例
    const x = width / 2 - d.x * scale;
    const y = height / 2 - d.y * scale;

    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
  }

  // === 7. 側邊欄詳情渲染 ===
  function showDetailInSidebar(d) {
    // 隱藏預設，顯示資訊區
    sidebarPlaceholder.classList.add("hidden");
    sidebarInfo.classList.remove("hidden");
    sidebar.classList.remove("collapsed");

    // 填入標題與陣營
    infoTitle.innerText = d.id;
    
    // 設定徽章樣式與文字
    infoBadge.className = "group-badge";
    if (d.type === "character") {
      infoType.innerText = "人物";
      infoBadge.innerText = d.group + "營";
      infoBadge.classList.add(
        d.group === "蜀" ? "shuhan" : 
        d.group === "魏" ? "caowei" : 
        d.group === "吳" ? "dongwu" : "qunxiong"
      );
      // 人物無年份，隱藏年份區
      infoMetaContainer.style.display = "none";
    } else {
      infoType.innerText = "事件";
      infoBadge.innerText = "經典故事";
      infoBadge.classList.add("event");
      
      // 顯示年份
      infoMetaContainer.style.display = "flex";
      infoMetaVal.innerText = d.year || "公元前後";
    }

    // 填入描述與遊戲
    infoDesc.innerText = d.description || "暫無事蹟記載。";
    infoGames.innerText = d.games || "暫無衍生遊戲記載。";

    // 獲取所有關聯對象
    const connections = [];
    links.forEach(l => {
      if (l.source.id === d.id) {
        connections.push({ id: l.target.id, type: l.target.type, relationship: l.target.type === "event" ? "參與事件" : "相關人物" });
      } else if (l.target.id === d.id) {
        connections.push({ id: l.source.id, type: l.source.type, relationship: l.source.type === "event" ? "參與事件" : "相關人物" });
      }
    });

    infoConnCount.innerText = connections.length;
    
    // 清空並渲染關聯對象列表
    infoConnections.innerHTML = "";
    connections.forEach(conn => {
      const li = document.createElement("li");
      
      const nameSpan = document.createElement("span");
      nameSpan.className = "conn-name";
      nameSpan.innerText = conn.id;
      
      const relSpan = document.createElement("span");
      relSpan.className = "conn-relationship";
      relSpan.innerText = conn.relationship;
      
      li.appendChild(nameSpan);
      li.appendChild(relSpan);
      
      // 點擊列表項目可聚焦跳轉
      li.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetNode = nodes.find(n => n.id === conn.id);
        if (targetNode) {
          selectedNode = targetNode;
          showDetailInSidebar(targetNode);
          highlightConnections(targetNode);
          centerNode(targetNode);
        }
      });
      
      infoConnections.appendChild(li);
    });
  }

  // === 8. 控制面板邏輯 (搜尋、過濾、力學參數) ===
  
  // 1. 搜尋功能
  searchInput.addEventListener("input", function() {
    const val = this.value.trim().toLowerCase();
    
    if (val === "") {
      searchClear.style.display = "none";
      if (!selectedNode) resetHighlights();
      return;
    }

    searchClear.style.display = "block";
    
    // 模糊匹配
    const matchedIds = new Set();
    nodes.forEach(n => {
      if (n.id.toLowerCase().includes(val) || (n.description && n.description.toLowerCase().includes(val))) {
        matchedIds.add(n.id);
      }
    });

    if (matchedIds.size > 0) {
      // 高亮符合的節點，其餘淡出
      node.classed("fade-out", n => !matchedIds.has(n.id));
      labels.classed("fade-out", n => !matchedIds.has(n.id));
      link.classed("fade-out", true); // 連線淡出
    } else {
      // 無匹配，全部淡出
      node.classed("fade-out", true);
      labels.classed("fade-out", true);
      link.classed("fade-out", true);
    }
  });

  // 清除搜尋
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.style.display = "none";
    if (selectedNode) {
      highlightConnections(selectedNode);
    } else {
      resetHighlights();
    }
  });

  // 2. 勢力過濾功能
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      // 切換按鈕 active 樣式
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      
      const filterType = this.getAttribute("data-filter");
      
      if (filterType === "all") {
        resetHighlights();
        // 恢復節點與連線的不透明度
        node.style("display", null);
        link.style("display", null);
        labels.style("display", null);
        return;
      }

      // 過濾邏輯：
      // 如果過濾的是勢力 (蜀, 魏, 吳, 群)，我們顯示該勢力的人物，以及與該勢力人物直接相關的事件與連線。
      // 如果過濾的是事件 (event)，我們顯示所有事件節點。
      const visibleNodeIds = new Set();
      
      if (filterType === "event") {
        nodes.forEach(n => {
          if (n.type === "event") visibleNodeIds.add(n.id);
        });
      } else {
        // 勢力過濾 (蜀, 魏, 吳, 群)
        // 1. 找出該勢力的人物
        nodes.forEach(n => {
          if (n.type === "character" && n.group === filterType) {
            visibleNodeIds.add(n.id);
          }
        });
        // 2. 找出與這些人物直接相連的事件
        links.forEach(l => {
          if (visibleNodeIds.has(l.source.id || l.source)) {
            visibleNodeIds.add(l.target.id || l.target);
          }
          if (visibleNodeIds.has(l.target.id || l.target)) {
            visibleNodeIds.add(l.source.id || l.source);
          }
        });
      }

      // 套用隱藏/顯示
      node.style("display", n => visibleNodeIds.has(n.id) ? null : "none");
      labels.style("display", n => visibleNodeIds.has(n.id) ? null : "none");
      link.style("display", l => {
        const srcId = l.source.id || l.source;
        const tgtId = l.target.id || l.target;
        return (visibleNodeIds.has(srcId) && visibleNodeIds.has(tgtId)) ? null : "none";
      });

      // 再次觸發模擬，微調排版
      simulation.alpha(0.3).restart();
    });
  });

  // 3. 力學滑動條參數實時更新
  sliderLinkDist.addEventListener("input", function() {
    const val = parseFloat(this.value);
    valLinkDist.innerText = val;
    simulation.force("link").distance(val);
    simulation.alpha(0.3).restart();
  });

  sliderCharge.addEventListener("input", function() {
    const val = parseFloat(this.value);
    valCharge.innerText = val;
    simulation.force("charge").strength(val);
    simulation.alpha(0.3).restart();
  });

  sliderCollide.addEventListener("input", function() {
    const val = parseFloat(this.value);
    valCollide.innerText = val;
    simulation.force("collide").radius(d => d.radius + val - 40); // 基於滑桿調整比例
    simulation.alpha(0.3).restart();
  });

  // 4. 重啟模擬按鈕
  btnRestartSim.addEventListener("click", () => {
    simulation.alpha(1).restart();
  });

  // 5. 顯示隱藏標籤
  toggleLabels.addEventListener("change", function() {
    labels.style("opacity", this.checked ? "1" : "0");
  });

  // === 9. 縮放按鈕控制 ===
  btnZoomIn.addEventListener("click", () => {
    svg.transition().duration(300).call(zoom.scaleBy, 1.3);
  });

  btnZoomOut.addEventListener("click", () => {
    svg.transition().duration(300).call(zoom.scaleBy, 0.7);
  });

  btnZoomReset.addEventListener("click", () => {
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  });

  // === 10. D3 拖曳事件處理 ===
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    // 釋放拖動，讓節點彈回（也可以設定不釋放，這裡釋放可保持動態圖的彈性美感）
    d.fx = null;
    d.fy = null;
  }

  // 視窗自適應縮放
  window.addEventListener("resize", () => {
    width = canvasContainer.clientWidth;
    height = canvasContainer.clientHeight;
    svg.attr("width", "100%").attr("height", "100%");
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
    simulation.alpha(0.3).restart();
  });
});
