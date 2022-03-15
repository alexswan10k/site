import jp from "jmespath";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";

//jp.search()

function b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str));
};

function UnicodeDecodeB64(str: string) {
    return decodeURIComponent(atob(str));
};

// write a function to turn a string to base 64 string

type State = {
    json: string,
    search: string,
    result: string
}

export const JsonComp = () => {
    const params = useParams();
    const l = useLocation();
    console.log("params", params, l)
    const m = params["payload"];

    let jsonS: State = {json: "", search: "", result: ""};
    try {
        const decoded = UnicodeDecodeB64(m != null ? m : "")
        jsonS = JSON.parse(m != null ? decoded : "{}");
    }
    catch (ex) {
        console.error(ex);
    }

    const [state, setState] = useState<State>({json: jsonS?.json, search: jsonS?.search, result: jsonS?.result })

    const navigate = useNavigate()
    const setStateByNav = (s: State) => {
        navigate(`/json/${b64EncodeUnicode(JSON.stringify(s))}`)
    }
    const setJson = (json: string) => setState({ ...state, json })
    const setSearch = (search: string) => setState({ ...state, search })
    const setResult = (result: string) => setState({ ...state, result })

    useEffect(() => {
        try{
            const res = jp.search(JSON.parse(state.json), state.search);
            setResult(res)
        }
        catch(ex){
            console.error(ex);
        }
    }, [state.json, state.search])

    return <div>
        <div>
            Query:
        <input type="text" value={state.search} onChange={x => setSearch(x.target.value)} />
        </div>
        <div>
            Json:
        <textarea value={state.json} onChange={x => setJson(x.target.value)}  />
        </div>
        <button onClick={() => setStateByNav(state)}>Update link</button>
        <div>
        {state.result}
        </div>
    </div>
}
