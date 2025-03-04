// src/components/FileUpload.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    veratadSuccess,
    veratadFailure,
    sendVeratad,
    setLicensePreview,
    setBarcodePreview,
    sendVeratadRequest,
    sendVeratadComplete,
} from "../redux/actions";
import OcrService, { IdType } from "./OcrService";
import { getOcrServiceData } from "../services/EnvironmentConfigService";
import { Button, TextField, Grid, Typography, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";


function FileUpload({ onSubmit }) {
    const [licenseFile, setLicenseFile] = useState(null);
    const [barcodeFile, setBarcodeFile] = useState(null);
    const dispatch = useDispatch();

    const handleLicenseChange = (event) => {
        const file = event.target.files[0];
        setLicenseFile(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            dispatch(setLicensePreview(previewUrl));
        } else {
            dispatch(setLicensePreview(null));
        }
    };

    const handleBarcodeChange = (event) => {
        const file = event.target.files[0];
        setBarcodeFile(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            dispatch(setBarcodePreview(previewUrl));
        } else {
            dispatch(setBarcodePreview(null));
        }
    };

    const handleSubmit = async () => {
        dispatch(sendVeratadRequest());
        dispatch(sendVeratad({ licenseFile, barcodeFile }));

        try {
            const ocrService = new OcrService(getOcrServiceData());
            let licenseBase64 = licenseFile ? await toBase64(licenseFile) : "";
            let barcodeBase64 = barcodeFile ? await toBase64(barcodeFile) : "";

            licenseBase64 = licenseBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
            barcodeBase64 = barcodeBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

            const response = await ocrService.CallOcr(licenseBase64, barcodeBase64, IdType.LICENSE);

            console.log("API Response:", response);

            if (response === undefined) {
                throw new Error("OCR Scan not work offline");
            }

            dispatch(veratadSuccess(response.data));
            if (onSubmit) {
                onSubmit();
            }
        } catch (error) {
            dispatch(veratadFailure(error.message || "Error processing OCR data"));
        } finally {
            dispatch(sendVeratadComplete());
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        <ImageIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
                        Upload Images
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="file"
                        accept="image/*"
                        onChange={handleLicenseChange}
                        fullWidth
                        margin="normal"
                        label="License Image"
                        InputProps={{
                            startAdornment: (
                                <IconButton component="span" style={{ padding: "8px" }}>
                                    <UploadFileIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="file"
                        accept="image/*"
                        onChange={handleBarcodeChange}
                        fullWidth
                        margin="normal"
                        label="Barcode Image (Optional)"
                        InputProps={{
                            startAdornment: (
                                <IconButton component="span" style={{ padding: "8px" }}>
                                    <UploadFileIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: "20px" }}
                    >
                    Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FileUpload;