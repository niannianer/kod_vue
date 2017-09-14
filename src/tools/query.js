/**
 * Created by DELL on 2017/6/29.
 */
let query = {};
let search = window.location.search;
if (search) {
    search = search.substr(1);
    let params = search.split('&');
    params.map(param => {
        let key = param.split('=')[0];
        let value = param.split('=')[1] || '';
        query[key] = value
    });
}

export default  query;
