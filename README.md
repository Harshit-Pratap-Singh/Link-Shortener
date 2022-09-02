# Link-Shortener

<h2>Post request body structure:-</h2> 
Endpoint->"https://nano1.vercel.app/v1/shrink" <br/>

{<br/>
   <p>&emsp;    "url":"https://www.longUrl.com" <p/> 
    <p>&emsp;    "customURL":"custom-string"(optional) <p/> 
}
<br/>
<h2>Example</h2>
{<br/>
   <p>&emsp;    "url":"https://www.longUrl.com" <p/> 
    <p>&emsp;    "customURL":"my-custom-string"(optional) <p/> 
}<br/>
output link with customURL--> https://nano1.vercel.app/my-custom-string<br/>
output link without customURL--> https://nano1.vercel.app/ashd6h8


