import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnStyles, BtnUnderline, Editor, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';

const CustomEditor = ({ value, onChange }:any) => {
    return (
        <Editor style={{height:"150px"}} value={value} onChange={onChange} >
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnStyles />
                <BtnLink />
                <BtnUnderline />
                <BtnClearFormatting />
                <Separator />
                <BtnBulletList />
            </Toolbar>
        </Editor>
    );
}

export default CustomEditor;
