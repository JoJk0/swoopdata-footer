<template>
    <div class="cnt">
        <div class="container">
            <h1>Swoop Datacom footer generator</h1>
            <form @submit.prevent="copy">
                <input v-model="name" type="text" name="name" placeholder="Your name..." />
                <input
                    v-model="position"
                    type="text"
                    name="position"
                    placeholder="Your position..."
                />
                <input
                    v-model="officePhone"
                    type="tel"
                    name="office-phone"
                    placeholder="Office phone number..."
                />
                <input
                    v-model="mobilePhone"
                    type="tel"
                    name="mobile-phone"
                    placeholder="Your mobile phone number..."
                />
                <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Your email address..."
                />
                <input v-model="website" type="url" name="website" placeholder="Website URL..." />
                <button type="submit">Copy</button>
            </form>
            <div class="info" v-if="info">{{ info }}</div>
            <div class="instructions">
                <div class="title">Install instructions (with HTML file)</div>
                <ol>
                    <li>
                        <p>Download and install Email Signature Rescue</p>
                        <p style="display: flex; gap: 1em;">
                            <a href="https://bit.ly/esr-windows-installer-3062-1">
                                <button target="_blank">Download for Windows</button>
                            </a>
                            <a href="https://bit.ly/esr-mac-installer-3118-1">
                                <button target="_blank">Download for macOS</button>
                            </a>
                        </p>
                    </li>
                    <li>
                        <p>Download generated HTML Signature</p>
                        <p>
                            <button @click="download">Generate HTML file</button>
                        </p>
                    </li>
                    <li>Open Email Signature Rescue</li>
                    <li>Select your E-mail app and your email address</li>
                    <li>Select "Add Signature"</li>
                    <li>Click "USE FILE"</li>
                    <li>Choose HTML generated file</li>
                    <li>Install signature</li>
                </ol>
                <a
                    href="https://emailsignaturerescue.com/"
                    style="opacity: 0.5"
                    target="_blank"
                >Visit Email Signature Rescue website</a>
            </div>
        </div>
        <div class="renderer" v-html="renderer" ref="rendererEl"></div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import template from './footer.mjml';

import mjml2html from 'mjml-browser';

const name = ref('')
const position = ref('')
const officePhone = ref('')
const mobilePhone = ref('')
const email = ref('')
const website = ref('')

// const name = ref('Jakub Janisz')
// const position = ref('Full-Stack Developer')
// const officePhone = ref('+447946418503')
// const mobilePhone = ref('+447946418503')
// const email = ref('jj@swoopdata.com')
// const website = ref('https://swoopdata.com')

const info = ref('')

const rendererEl = ref<HTMLElement>()

const renderer = computed(() => {
    const props = {
        name: name.value,
        position: position.value,
        officePhoneNumber: officePhone.value,
        mobilePhoneNumber: mobilePhone.value,
        emailAddress: email.value,
        websiteUrl: website.value,
        ...assets,
    };

    const compiledTemplate = compile(template, props);

    const { html } = mjml2html(compiledTemplate);

    return html
})

const path = 'https://swoopdata.sirv.com/Images';

const assets = {
    logo: `${path}/png/logo.png`,
    logoText: `${path}/png/logo-text.png`,
    emailIcon: `${path}/png/at.png`,
    officePhoneIcon: `${path}/png/phone-ip.png`,
    mobilePhoneIcon: `${path}/png/phone.png`,
    webIcon: `${path}/png/wikis.png`,
};

const download = () => {
    const filename = `footer-${name.value.replace(' ', '-').toLowerCase()}.html`;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(renderer.value));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const compile = <TProps extends Record<string, string>>(template: string, props: TProps) => {
    const keys = Object.keys(props);
    const values = keys.map(key => props[key]);

    return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
        const index = keys.indexOf(key.trim());
        return values[index];
    });
}

const copy = async () => {

    const data = new Blob([renderer.value], { type: 'text/html' });

    const item = new ClipboardItem({ 'text/html': data });

    await navigator.clipboard.write([item]).catch(e => console.error(e));

    info.value = 'Copied to clipboard!'
}

// const generate = () => {
//     // // const htmlTemplateRenderer = compile(template);

//     // const props = {
//     //     name: name.value,
//     //     position: position.value,
//     //     officePhoneNumber: officePhone.value,
//     //     mobilePhoneNumber: mobilePhone.value,
//     //     emailAddress: email.value,
//     //     websiteUrl: website.value,
//     //     ...assets,
//     // };

//     // // const propDefs = Object.keys(props).reduce(
//     // //     (obj, key) => ({ ...obj, [key]: { type: String, required: true } }),
//     // //     {} as Record<string, { type: StringConstructor; required: boolean }>
//     // // );

//     // const compiledTemplate = compile(template, props);

//     // const { html: htmlTemplate } = mjml2html(compiledTemplate);

//     // const filename = `footer-${props.name.replace(' ', '-').toLowerCase()}.html`;

//     // console.info(
//     //     `✅ SUCCESS! Footer template ${filename} compiled.`
//     // );
//     // // download(filename, htmlTemplate);
//     // renderer.value = htmlTemplate
// }

// onMounted(() => {
//     generate();
// });

</script>
<style>
body {
    font-family: "Roboto", sans-serif;
}
.cnt {
    display: flex;
    gap: 2em;
    padding: 2em;
}
form {
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.info {
    padding: 1em;
    background: #8dffaa;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 2em;
    text-align: center;
}
.instructions.title {
    font-weight: 800;
}
.container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 30em;
    margin: 5em auto;
}
.renderer {
    border: 1px solid #ccc;
    padding: 1em;
    margin: 1em 0;
    flex: 1;
}
input {
    padding: 1em;
    border-radius: 2.5em;
    border: 1px solid rgba(0, 0, 0, 0.2);
}
button {
    background: #00a8ff;
    color: white;
    border: none;
    border-radius: 2.5em;
    padding: 1em;
}

@media (prefers-color-scheme: dark) {
    body {
        background: #273140;
        color: #fff;
    }
    input {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.7);
    }
}
</style>