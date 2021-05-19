import { useHistory } from "react-router-dom";

export default function GoBackButton() {
    let history = useHistory();
    return (
        <>
          <button onClick={() => history.goBack()} className="btn btn-outline-success m-3">Go Back</button>
        </>
    );
};
