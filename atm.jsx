const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    //let isValid = true; //CMB Esto no es lo que se pide, no entiendo qué se pide para este punto
    let isValid = ! validTransaction; //Porqué puedo acceder a validTransaction aquí?
    console.log("isValid: ", isValid);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>          
        <input type="submit" width="200" value="Submit" id="submit-input" disabled = {isValid}></input>                   
      </label>
    );
  };
  
  //<input type="submit" width="200" value="Submit" id="submit-input" disabled = {isValid}></input>
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [opcionATM,setOpcionATM] = React.useState(""); //CMB Selector drop list
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);  // True or False
  
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      setDeposit(Number(event.target.value));
      
      if (event.target.value <= 0) {
        setValidTransaction(false);
        return
      }
      if (opcionATM === "Cash Back" && event.target.value >= totalState) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
    };
  
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      console.log("newtotal: ", newTotal);
      setTotalState(newTotal);
      setValidTransaction(false);    
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {   
      setOpcionATM(event.target.value); //CMB   
      console.log("Seleccionado: ", event.target.value);    
      //console.log("Variable atmMode: ", atmMode);
      if (event.target.value === "Deposit") {
        setIsDeposit(true);
        console.log("Variable opcionATM inside if Deposit: ", opcionATM);
      }
      else if (event.target.value === "Cash Back") {
        setIsDeposit(false);
        console.log("Variable opcionATM inside if Cash Back: ", opcionATM);
      }
      else {      
        console.log("Variable opcionATM inside if Null: ", opcionATM);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>      
        {(opcionATM === "Deposit" || opcionATM === "Cash Back") && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>}
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  