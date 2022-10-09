function doPages() {
    let contentSections = document.querySelectorAll('.content-section')
    let DirectoryOutside = document.getElementById('DirectoryOutside')
    let offsetTop = 0
    let nowContentPage = 0
    let mystyle = getComputedStyle(document.documentElement)
    let pdfHeight = parseInt(mystyle.getPropertyValue('--pdf-height'))
    contentSections.forEach((contentSection, i) => {
        //做目錄
        let directoryPlaceIndex = i % 2
        let mainTitle = contentSection.querySelector('h2').innerText
        let subTitle = contentSection.querySelectorAll('h4:not(.not-maintitle)')
        if (directoryPlaceIndex == 0) {
            let directory = document.createElement('section')
            directory.classList.add('page')
            directory.classList.add('directory')
            directory.classList.add('pdf-mode-el')
            directory.innerHTML = `<h2 class="contents"></h2>
            <div class="directory-block">
                <h3>${mainTitle}</h3>
        </div>`
            DirectoryOutside.appendChild(directory)
        } else {
            let directory = document.querySelector('.directory:last-child')
            directory.innerHTML += `<h2 class=" "></h2>
            <div class="directory-block">
                <h3>${mainTitle}</h3>
        </div>`
        }
        let allDirectoryBlock = document.querySelectorAll('.directory-block')
        let directoryBlockCount = allDirectoryBlock.length
        let directoryBlock = allDirectoryBlock[directoryBlockCount - 1]
        let ul = document.createElement('ul')
        subTitle.forEach((title) => {
            let id = title.id
            let hrefHash = id ? id : ''
                // let pageNum = parseInt((title.offsetTop - offsetTop) / pdfHeight) + 1;
                // let pageNum_str = (pageNum < 10 ? "0" + pageNum : "" + pageNum);
            ul.innerHTML +=
                "<li><small></small><a href='#" +
                hrefHash +
                "'>" +
                title.innerHTML +
                '</a></li>'
        })
        directoryBlock.appendChild(ul)
    })
    offsetTop = contentSections[0].offsetTop

    let pageRoundIndex = 0
    contentSections.forEach((contentSection, i) => {
        //做頁碼
        let height = contentSection.clientHeight
        let newHeight = height
        let j = nowContentPage
        while (newHeight / pdfHeight > 0) {
            let pageNumEl = document.createElement('div')
            pageNumEl.classList.add('page-number')
            pageNumEl.classList.add('pdf-mode-el')
                //16是列印時的留白區高度，
            pageNumEl.style.top =
                // offsetTop + j * (pdfHeight + 16) + pdfHeight / 2 + 'px'
                offsetTop + j * (pdfHeight + 16) + pdfHeight / 2 + 'px'
            pageNumEl.innerHTML = j + 1
                // let pageRound = DirectoryOutside.querySelectorAll("small")[j]
                // pageRound.innerHTML = ((j + 1) < 10 ? "0" + (j + 1) : "" + (j + 1));
            document.getElementById('main').appendChild(pageNumEl)
            newHeight = newHeight - pdfHeight
            j++
            if (i < contentSections.length - 1 && newHeight < 0) {
                //最後一個
                let space = 0 - newHeight - 16
                contentSection.innerHTML +=
                    "<div style='height:" + space + "px' class='space pdf-mode-el'></div>"
            }
        }
        nowContentPage = j
    })

    document.querySelector('.contents').innerText = '目錄'
}

function doMenu() {
    let contentSections = document.querySelectorAll('.content-section')
    let Menu = document.getElementById('menu')
    let _offsetTop = 0
    let mystyle = getComputedStyle(document.documentElement)
    let pdfHeight = parseInt(mystyle.getPropertyValue('--pdf-height'))
    contentSections.forEach((contentSection, i) => {
        //做目錄
        let directoryPlaceIndex = i % 2
        let mainTitle = contentSection.querySelector('h2').innerText
        let subTitle = contentSection.querySelectorAll('h4:not(.not-maintitle)')
        if (directoryPlaceIndex == 0) {
            let directory = document.createElement('section')
                // directory.classList.add('page')
            directory.classList.add('directory_menu')
            directory.innerHTML = `
            <div class="directory-block_menu">
                <h3>${mainTitle}</h3>
        </div>`
            Menu.appendChild(directory)
        } else {
            let directory = document.querySelector('.directory_menu:last-child')
            directory.innerHTML += `
            <div class="directory-block_menu">
                <h3>${mainTitle}</h3>
        </div>`
        }
        let allDirectoryBlock = document.querySelectorAll('.directory-block_menu')
        let directoryBlockCount = allDirectoryBlock.length
        let directoryBlock = allDirectoryBlock[directoryBlockCount - 1]
        let ul = document.createElement('ul')
        subTitle.forEach((title) => {
            let id = title.id
            let hrefHash = id ? id : ''
            ul.innerHTML +=
                "<li><small></small><a href='#" +
                hrefHash +
                "'>" +
                title.innerHTML +
                '</a></li>'
        })
        directoryBlock.appendChild(ul)
    })
    _offsetTop = GetObjPos(contentSections[0]).y;

    let pageRoundIndex = 0
    contentSections.forEach((contentSection, i) => {
        let subTitle = contentSection.querySelectorAll('h4:not(.not-maintitle)')
        subTitle.forEach((title, index) => {
            let small = DirectoryOutside.querySelectorAll('small')[pageRoundIndex]
            let pageNum = parseInt((GetObjPos(title).y - _offsetTop) / pdfHeight) + 1
            let pageNum_str = pageNum < 10 ? '0' + pageNum : '' + pageNum
            small.innerHTML = '<span>' + pageNum_str + '</span>'
            pageRoundIndex++
        })
    })
}

function addSpaceForHash() {
    let TitlePage = document.getElementById('TitlePage')
    let _s = document.createElement('div')
    _s.style.height = '50px'
    _s.classList.add("html-mode-el")
    TitlePage.parentElement.prepend(_s)
    document.querySelectorAll('[id]:not(.no-space)').forEach((hasIdEl) => {
        let a = document.querySelector("a[href='#" + hasIdEl.id + "']")
        if (a && a != null) {
            let s = document.createElement('span')
            s.style.height = '50px'
                // s.style.display = 'block'
            s.classList.add("html-mode-el")
            s.classList.add("space-for-hash")
            hasIdEl.prepend(s)
        }
    })
}

function CPos(x, y) {
    this.x = x;
    this.y = y;
}

function GetObjPos(ATarget) {
    var target = ATarget;
    var pos = new CPos(target.offsetLeft, target.offsetTop);

    var target = target.offsetParent;
    while (target) {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;

        target = target.offsetParent
    }
    return pos;
}