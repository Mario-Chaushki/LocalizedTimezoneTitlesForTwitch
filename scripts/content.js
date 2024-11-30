let originalTitle;
let isConverted = false;

onElementAvailable('p[data-test-selector="stream-info-card-component__subtitle"]', (titleElement) => {
    titleElement.addEventListener('click', (e) => {
        if (!originalTitle) {
            originalTitle = e.target.textContent;
        }

        if (isConverted) {
            //return to original title
            e.target.textContent = originalTitle;
            isConverted = false;
            return;
        }

        localize(e.target);
        isConverted = true;
    });
});


//functions
function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(_ => {
        const titleElement = document.querySelector(selector);
        if (titleElement) {
            observer.disconnect();
            callback(titleElement);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function localize(element) {
    const localizedTitle = convertToLocalTime(element.textContent);
    element.textContent = localizedTitle;
}

