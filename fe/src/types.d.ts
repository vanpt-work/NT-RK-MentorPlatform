declare module "react-file-viewer" {
    type FileViewerProps = {
        fileType: string;
        filePath: string;
        onError?: (error: any) => void;
        errorComponent?: React.ComponentType<any>;
        unsupportedComponent?: React.ComponentType<any>;
    };

    const FileViewer: React.FC<FileViewerProps>;
    export default FileViewer;
}
