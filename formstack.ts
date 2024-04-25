export class Formstack {

  public base_uri: string = 'https://www.formstack.com/api/v2';
  private access_token: string;

  constructor (access_token: string) {
    this.access_token = access_token
  }

  get_smartlists = async (
    name?: string
  ) => {

    // param
    const params = new URLSearchParams()

    if (name) params.append('query',name)
    
    let url = params.size>0 ? `${this.base_uri}/smartlist?${ params.toString() }` : `${this.base_uri}/smartlist`;

    let smartlists: Array<object> = [];
    let proceed: boolean = false;

    do {

      const content = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
      });

      smartlists = smartlists.concat(content.results);

      // next page of data
      params.set('page',content.page+1)
      url = `${this.base_uri}/smartlist?${ params.toString() }`;

      // proceed if paged results are less than the total records
      proceed = content.page * content.perPage < content.total

    } while (proceed);

    return smartlists;

  }

  get_smartlist_options = async (
    id: number,
    name?: string
  ) => {

    // param
    const params = new URLSearchParams()

    if (name) params.append('query',name)
    
    let url = params.size>0 ? `${this.base_uri}/smartlist/${id}/option?${ params.toString() }` : `${this.base_uri}/smartlist/${id}/option`;
    console.log('url',url)

    let options: Array<object> = [];
    let proceed: boolean = false;

    do {

      const content = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
      });

      options = options.concat(content.results);

      // next page of data
      params.set('page',content.page+1)
      url = `${this.base_uri}/smartlist/${id}/option?${ params.toString() }`;
      console.log('url',url)

      // proceed if paged results are less than the total records
      proceed = content.page * content.perPage < content.total

    } while (proceed);

    return options;

  }

}