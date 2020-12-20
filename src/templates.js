{ {#each this } }
<image src = {{urlToImage}} alt = "Country Flag"></image>
<ul>
    <h1>{{ name }}</h1>
    <li>
    {{ capital }}  
    </li>
    <li>{{ population }}</li>
    <li> {{languages}}
    </li>
</ul>

{ { /each}}
