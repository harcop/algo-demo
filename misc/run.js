!run<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="UTF-8">
    <title>Untitled Document</title>
    <meta name="Author" content="" />
    <link rel="stylesheet" type="text/css" href="style.css">
    <style>
        body > .code {
            display: none
        }
    </style>
</head>

<body>
    <div class="code">
        <!DOCTYPE html>
        <html>

        <head>
            <style>
                .city {
                    background-color: tomato;
                    color: white;
                    border: 2px solid black;
                    margin: 20px;
                    padding: 20px;
                }

            </style>
        </head>

        <body>

            <div class="city">
                <h2>London</h2>
                <p>London is the capital of England.</p>
            </div>

            <div class="city">
                <h2>Paris</h2>
                <p>Paris is the capital of France.</p>
            </div>

            <div class="city">
                <h2>Tokyo</h2>
                <p>Tokyo is the capital of Japan.</p>
            </div>

        </body>

        </html>

    </div>
    <div>
        <div class="coder">

        </div>
    </div>

    <script>
        let g = document.getElementsByClassName('code');
        let frame = document.getElementsByClassName('coder');
        frame[0].innerHTML = g[0].outerHTML;
        console.log(g)
        console.log(frame[0], 'hacker')

    </script>

</body>

</html>
