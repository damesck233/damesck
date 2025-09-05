export const useBlog = () => {
    const url = '/api/posts'
    fetch(url)
        .then(resp => resp.json())
        .then(data => {console.log(data)})
}
