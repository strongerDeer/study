"use client";
import "@ant-design/v5-patch-for-react-19";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import heic2any from "heic2any";

export default function Page() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const isHeic = (file: File) => {
    return (
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif")
    );
  };
  const beforeCrop = async (file: File): Promise<boolean | File> => {
    try {
      if (isHeic(file)) {
        setIsConverting(true);
        const loadingMessage = message.loading(
          "HEIC 이미지를 변환 중입니다. 잠시만 기다려주세요..."
        );

        const jpgBlob = (await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        })) as Blob;

        const newFileName = file.name.replace(/\.heic$|\.heif$/i, ".jpg");
        const jpgFile = new File([jpgBlob], newFileName, {
          type: "image/jpeg",
        });

        loadingMessage();
        setIsConverting(false);
        return jpgFile;
      }
      return file;
    } catch (error) {
      console.error("파일 변환 중 오류 발생:", error);
      message.error("이미지 변환 중 오류가 발생했습니다.");
      return file;
    }
  };
  return (
    <div>
      <ImgCrop beforeCrop={beforeCrop} aspect={1}>
        <Upload
          onChange={onChange}
          listType="picture-card"
          fileList={fileList}
          disabled={isConverting}
        >
          {isConverting ? "업로드중..." : "업로드"}
        </Upload>
      </ImgCrop>
    </div>
  );
}
