express = require('express');
path = require('path');
bcrypt = require('bcrypt');
Student = require('./database');  // here require than database connected 
app = express();
port = 3000;

//middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('login');
})

app.get('/home',(req,res)=>{
    res.render('home')
})

app.post('/', async (req,res)=>{
    //const {uname, pass} = req.body;
    // data = {
    //     uname: req.body.uname,
    //     pass: req.body.pass
    // }
   const checkuser = await Student.findOne({uname: req.body.uname})
    if(checkuser){
        const checkpass = await bcrypt.compare(req.body.pass, checkuser.pass);
        if(checkpass){
            res.redirect('/home')}
        else{res.send('incorrect password')}
    }
    else{res.send('username does not exist')}
    // console.log(uname, pass)
    // res.redirect('/register')
})



app.post('/register', async(req,res)=>{
   const {uname, pass} = req.body;

   existinguser = await Student.findOne({uname})
   if(existinguser){res.send('user already exists. please try another user name')}
   else{
    enpass = await bcrypt.hash(pass, 15);
    newStudent = new Student({
    uname: uname,
    pass: enpass
});
    console.log(uname, enpass)
    Studentsave = await newStudent.save();
    res.redirect('/register')};
})

app.get('/register', (req, res)=> {
    res.render('register')
})


app.listen(port, () => {
    console.log(`server running on port  ${port}`);
})