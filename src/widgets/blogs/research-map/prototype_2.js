let utils = require('../../../lib/utils')
let html = require('./prototype_2.tmpl.html')
let YAML = require('yamljs')
let rawMap = YAML.load('./research-map.yaml')


function htmlNodeLoader(node, $el, _name) {
    // Read through hierarchy and create the HTML we need
    // to support the nested accordions

    let $header = $('<h3>')
    let $content = $('<div>')

    let nodeName = (_name || node.name)

    if (! nodeName) {
        let childNames = Object.keys(node)
        let $ul = $('<ul class="accordion">')
        childNames.forEach((name, i) => {
            if (name === "desc") {

            } else if (name === "resources") {
            } else if (name === "requires") {

            } else {
                let $li = htmlNodeLoader(node[name], $('<li>'), name)
                $ul.append($li)
            }
        })
        $content.html($ul)
    } else if (node.children) {
        $content = htmlNodeLoader(node.children, $content)
    }

    $header.html(nodeName)

    $el.append([$header, $content])
    return $el
}

function loadAccordionHtml(elId) {
    return htmlNodeLoader(rawMap, $('#' + elId))
}

function render(elId) {
    let $el = loadAccordionHtml(elId)

    // $el.accordion()

    $el.find("ul.accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });
}

function researchMap(elId) {
    utils.loadHtml(html.default, 'research-map', () => {
        render(elId)
    })
}

window.BHTMS = {
    researchMap: researchMap
}
