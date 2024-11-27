document.addEventListener("DOMContentLoaded", () => {
    const validClerks = ['蕭睿岑', '陳奕元', '陳昕妍', '吳佳佳', '平靖恩', '黃靖元', '黃語萱', '孫士謙', '林宸安', '黃智鋒', '賴逸姍', '詹詠亘', '龐惠玲', '彭思璿', '董侑宸', '羅宥姍', '龔采筠', '許靖筠', '張彭博', '鄭百珊', '鐘珮慈', '陳冠妤', '陳思安', '陳雁屏', '沈宜靜', '蔡亞芝', '孫偉綸', '葉雲皓', '顏安俞', '王歆妧', '李宜靜', '郭洺睿', '何詩芊', '張亭怡', '朱盈璇', '曾祥愷', '顏郁真', '翁慈薇', '李品萱', '劉語雯', '龔子穎', '黃羿寧', '黃妍樺', '洪若旭', '張以諾', '池昱瑩', '陳思齊', '歐芯妍', '尤姝涵', '汪若懷', '林沛辰', '林子鈞', '林妍姿', '高芝翊', '郭橙翰', '陳彥綸', '岩瀨璃瑜'];

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) ? decodeURIComponent(urlParams.get(param)) : null;
    }

    function decodeClerkName(encodedName) {
        try {
            return decodeBase64toUTF8(encodedName);
        } catch (error) {
            return null;
        }
    }

    function decodeBase64toUTF8(encoded) {
        return decodeURIComponent(escape(atob(encoded)));
    }

    function clearURLParameters() {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function isFestivalTime() {
        const now = new Date();
        const year = now.getFullYear();
        const startDate = new Date(year, 10, 27);
        const endDate = new Date(year, 11, 7);
        return now >= startDate && now <= endDate;
    }

    function disablePage(errorCode = 0) {
        if (!isFestivalTime()) {
            console.log("Festival has not yet started.");
            clerkInput.readOnly = false;
            return;
        }

        form.style.display = 'none';

        if (errorCode === 1) {
            error = '資料驗證錯誤';
        }
        else if (errorCode === 2) {
            error = '連線逾時';
        }
        else {
            error = '安全模式已開啟';
        }
      
        const errorHeader = document.createElement('h1');
        errorHeader.innerHTML = `${error}，請重新掃描英語週工人<span class="hanLatin" style="padding-right: 0">QR Code</span>。`;
        errorHeader.style.alignSelf = 'center';
        errorHeader.style.textAlign = 'center';
        errorHeader.style.flex = 1;
        const errorDiv = document.getElementsByClassName('blurred-bg')[0];
        errorDiv.style.display = 'flex';
        errorDiv.appendChild(errorHeader);
    }

    const TIME_LIMIT = 10 * 60 * 1000;

    const encodedClerkName = getQueryParam('clerk');
    if (!encodedClerkName) {
        disablePage();
        return;
    }

    const clerkName = decodeClerkName(encodedClerkName);
    if (!clerkName || !validClerks.includes(clerkName)) {
        disablePage(1);
        return;
    }

    clerkInput.value = clerkName;
    clearURLParameters();

    setTimeout(() => { disablePage(2); }, TIME_LIMIT);
});