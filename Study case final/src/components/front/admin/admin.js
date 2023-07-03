
function Admin(props) {
    const {info} = props;
  
    return <table className="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Mail</th>
        <th scope="col">Password</th>
       
      </tr>
    </thead>
    <tbody>
    {info.map((item)=>{
        return (
            <tr key={item.id}>
        <td scope="row">{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
    </tr>
        )
    }
    )}
    </tbody>
  </table>}

    export default Admin;