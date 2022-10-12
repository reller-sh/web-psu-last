const fs = require('fs');
const axios = require('axios');


const data = JSON.stringify({
    query: `
    query I18N {
        i18n (
            limit: -1
            filter: {
                module: {
                    _eq: "locale"
                }
            }
        ){
            name
            value
            lang {
                code
            }
        }
    }
`,
});

const config = {
    method: 'post',
    url: 'https://dev/url/graphql',
    headers: {
        'Content-Type': 'application/json',
    },
    data,
};


try {

    axios(config)
        .then((response) => {
            fs.writeFileSync('lib/i18n/translations.json', JSON.stringify(response.data.data.i18n));
        })
        .catch((error) => {
            console.log(error);
        });

}
 catch (e) {
    console.log('')
 }
