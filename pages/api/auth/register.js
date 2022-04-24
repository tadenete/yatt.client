export default async function handler(req, res){

    const {email, password, confirmPassword} = req.body;

    //server side validation
    if(!email || !email.includes('@') || !password || password !== confirmPassword){
        return res.status(422).json({message : 'Invalid request!'})
    }

    //send request
    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ email, password, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if(!response.ok){
          return res.status(400).json({message : data.message || "something went wrong!"})
      }

      return res.status(200).json({message: data.message})
}