import jp from "jmespath";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";

function b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str));
};

function UnicodeDecodeB64(str: string) {
    return decodeURIComponent(atob(str));
};

type IptState = {
    json: string,
    search: string,
}

type State = IptState & {
    result: string
}

export const JsonComp = () => {
    const params = useParams();
    const payload = params["payload"];

    let jsonS: IptState = {json: "", search: ""};
    try {
        const decoded = decodeURIComponent(payload != null ? payload : "") //UnicodeDecodeB64(payload != null ? payload : "")
        jsonS = JSON.parse(payload != null ? decoded : "{}");
    }
    catch (ex) {
        console.error(ex);
    }

    const [state, setState] = useState<State>({json: jsonS?.json, search: jsonS?.search, result: "" })

    const navigate = useNavigate()
    const setStateByNav = (s: IptState) => {
        const b64 = encodeURIComponent(JSON.stringify(s)) //b64EncodeUnicode(JSON.stringify(s))
        navigate(`/json/${b64}`)
    }
    const setJson = (json: string) => setState({ ...state, json })
    const setSearch = (search: string) => setState({ ...state, search })
    const setResult = (result: string) => setState({ ...state, result })

    useEffect(() => {
        try{
            const res = jp.search(JSON.parse(state.json), state.search);
            if(typeof(res) === "string") setResult(res)
            else setResult(JSON.stringify(res))
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
        <button onClick={() => setStateByNav({ json: state.json, search: state.search })}>Update link</button>
        <div>
        {state.result}
        </div>
    </div>
}
