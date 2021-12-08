function isPageBottom(e){
    const html = e.target.scrollingElement;
    return (html.scrollHeight - html.scrollTop === html.clientHeight);
}

export {isPageBottom}