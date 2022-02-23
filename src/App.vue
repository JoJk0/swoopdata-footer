<template>
    <form @submit.prevent="generate">
        <div class="container">
            <h1>Swoop Datacom footer generator</h1>
            <input v-model="name" type="text" name="name" placeholder="Your name..." />
            <input v-model="position" type="text" name="position" placeholder="Your position..." />
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
            <input v-model="email" type="email" name="email" placeholder="Your email address..." />
            <input v-model="website" type="url" name="website" placeholder="Website URL..." />
            <button type="submit">Generate</button>
        </div>
    </form>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import template from './generated/footer-inlined.html';

import emailAsset from './assets/at.svg';
import logoAsset from './assets/logo.svg';
import officePhoneAsset from './assets/phone-ip.svg';
import mobilePhoneAsset from './assets/phone.svg';
import webAsset from './assets/wikis.svg';

type Props = {
    name: string;
    position: string;
    officePhoneNumber: string;
    mobilePhoneNumber: string;
    emailAddress: string;
    websiteUrl: string;
};

const name = ref('')
const position = ref('')
const officePhone = ref('')
const mobilePhone = ref('')
const email = ref('')
const website = ref('')

const assets = {
    emailIcon: emailAsset,
    logo: logoAsset,
    officePhoneIcon: officePhoneAsset,
    mobilePhoneIcon: mobilePhoneAsset,
    webIcon: webAsset,
};

function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
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

const generate = () => {
    // const htmlTemplateRenderer = compile(template);

    const props = {
        name: name.value,
        position: position.value,
        officePhoneNumber: officePhone.value,
        mobilePhoneNumber: mobilePhone.value,
        emailAddress: email.value,
        websiteUrl: website.value,
        ...assets,
    };

    // const propDefs = Object.keys(props).reduce(
    //     (obj, key) => ({ ...obj, [key]: { type: String, required: true } }),
    //     {} as Record<string, { type: StringConstructor; required: boolean }>
    // );

    const htmlTemplate = compile(template, props);

    const filename = `footer-${props.name.replace(' ', '-').toLowerCase()}.html`;

    console.info(
        `✅ SUCCESS! Footer template ${filename} compiled.`
    );
    download(filename, htmlTemplate);
}

</script>
<style>
body {
    font-family: "sans-serif";
}
.container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 30em;
    margin: 5em auto;
}
input {
    padding: 1em;
    border-radius: 2.5em;
}
button {
    background: #00a8ff;
    color: white;
    border: none;
    border-radius: 2.5em;
    padding: 1em;
}
</style>