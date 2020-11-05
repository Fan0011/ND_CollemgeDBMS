exports.getAllProjects = (req, res) => {
    const connection = req.app.get('connection');
    var { tag, order } = req.query;
    order = order === '-1' ? 'DESC': 'ASC';
    connection.query('SELECT * FROM research_proj ORDER BY ' + tag + ' ' + order, (err, result) => {
        if(!err) {
            res.status(200).json(result);
        }
    });
}

exports.addProject = (req, res) => {
    const connection = req.app.get('connection');
    // const post = { bookid: 5, bname: 'Rich Dad Poor Dad', edition: 5, author: 'Robert Kiyosaki' };
    const { pid, pname, p_desc } = req.body;
    const post = { pid, pname, p_desc };
    connection.query('INSERT INTO research_proj SET ?', [post], (err, result) => {
        if(!err) {
            res.status(201).json(result);
        }
    })
}

exports.searchProject = (req, res) => {
    const connection = req.app.get('connection');
    var { tag, filter } = req.query;
    filter = '%' + filter + '%';
    connection.query(' SELECT * FROM research_proj WHERE ' + tag + ' LIKE ?', [filter], (err, result) => {
        if(!err) {
            res.status(200).json(result);
        }
    })
}

exports.countProject = (req, res) => {
    const connection = req.app.get('connection');
    connection.query(
        'SELECT COUNT(DISTINCT rp.pname) AS noOfProjects, COUNT(DISTINCT rs.sapid) AS noOfStudents, COUNT(DISTINCT rf.fid) AS noOfFaculties  FROM (research_proj rp INNER JOIN research_student rs ON rs.pid = rp.pid) INNER JOIN research_faculty rf',
        (err, result) => {
            if(!err) {
                res.status(200).json(result);
            }
        })
}