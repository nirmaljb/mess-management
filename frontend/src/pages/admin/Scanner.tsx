import Html5QrcodePlugin from "@/lib/Html5QrcodePlugin";

const Scanner = (props) => {

    const onNewScanResult = (decodedText, decodedResult) => {
        // handle decoded results here
        console.log(decodedText, decodedResult);
        return;
    };

    return (
        <div className="App">
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
};

export default Scanner;