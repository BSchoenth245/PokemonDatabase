document.querySelector('#btnSwapMtS').addEventListener('click', (event) => {
    // fetch ("components/SearchPokemon.html")
    // .then(response => response.text())
    // .then(html => {
    //     const objScript = document.createElement('script');
    //     objScript.src = 'js/table.js'; 
    //     objScript.type = 'text/javascript';
    //     document.head.appendChild(objScript);
    //     objScript.onload = () => {
    //         fillTable(arrCourseInfo)
    //       };
        $('#mainScreen').removeClass('d-flex')
        document.querySelector('#mainScreen').style.display = 'none';
        document.querySelector('#enterPkm').style.display = 'block';
    })
//})