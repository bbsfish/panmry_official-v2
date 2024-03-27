const file_desc01 = "./assets_docs/introduce.txt";
const file_gal01 = "./assets_docs/gallery-part.xml";



let gal_counter = 1;
const marker = document.getElementById("readmore_elem");

function gal() {
    if (gal_counter == -1) { return -1; }
    let req = new XMLHttpRequest();
    req.open("GET", file_gal01, true);
    req.send();
    return req.onreadystatechange = function () {
        const gal = document.getElementById("gal");
        if (req.readyState == 4 && req.status == 200) {
            let docElem = req.responseXML.documentElement;
            let data_nodes = docElem.getElementsByTagName("data");
            let file_nodes = docElem.getElementsByTagName("file");
            let desc_nodes = docElem.getElementsByTagName("desc");

            if (gal_counter * 10 <= data_nodes.length) {
                printout((gal_counter-1) * 10, gal_counter * 10);
            } else {
                printout((gal_counter-1) * 10, data_nodes.length);
                gal_counter = -1;
                marker.style.display = "none";
                return -1
            }
            gal_counter++;

            function printout(s, e) {
                for (i = s; i < e; i++) {
                    let new_li = document.createElement('li');
                    let new_a = document.createElement('a');
                    let new_img = document.createElement('img');
                        new_img.src = "./assets/" + file_nodes[i].textContent;
                        new_a.appendChild(new_img);
                        new_li.appendChild(new_a);
                    let new_p = document.createElement('p');
                        new_p.innerHTML = desc_nodes[i].textContent.replace(/\r?\n/g, '<br>');
                        new_li.appendChild(new_p);
                    gal.appendChild(new_li);
                }
                if (window.innerWidth > 1400 && (e-s) % 2 == 1) {
                    // 要素数が奇数のとき、最終行に空欄追加
                    let new_li = document.createElement('li');
                    let new_img = document.createElement('img');
                    let new_a = document.createElement('a');
                        new_a.appendChild(new_img);
                        new_li.appendChild(new_a);
                    let new_p = document.createElement('p');
                        new_p.innerHTML = "Don't miss it.";
                        new_li.appendChild(new_p);
                    gal.appendChild(new_li);
                }
            }
        }
    }
}

marker.onclick = function () {
    gal();
}