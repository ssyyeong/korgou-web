import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  OutlinedInputProps,
  Select,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { ImageController } from '../../../controller/ImageController';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import ImageController from "../../controller/ImageController";

interface InputProps {
  type: string;
  value: any;
  setValue?: any;
  dataList?: any;
  width?: any;
  label?: string;
  minDate?: any;
  maxDate?: any;
  views?: any;
  children?: React.ReactNode;
  btnContent?: string;
  btnOnClick?: () => void;
  iconList?: string[];
  style?: SxProps;
  useIcon?: boolean;
  additionalProps?: { [key: string]: any };
  inputType?: string;
  eraseValue?: () => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd?: (value: any) => void;
  handleDelete?: (value: any, idx: number) => void;
  maxLength?: number;
  error?: boolean;
  outLineInputProps?: OutlinedInputProps;
  fileTypeInputName?: boolean;
  fileTypeInputNameMaxSize?: {
    unit: "KB" | "MB" | "GB";
    size: number;
  };
}

//* 서포티 인풋 컴포넌트
const Input = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    //* 파일 선택을 위한 ref
    const inputRef = React.useRef<HTMLInputElement>(null);

    //* Modules
    const imageController = new ImageController({});
    //* States
    const [addableData, setAddableData] = useState<string>("");
    //* Functions
    //* 파일 삭제 시 인풋 초기화
    const resetInputValue = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    //* 파일 선택 시 호출되는 함수
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const files = fileList ? Array.from(fileList) : [];
      //* 파일 사이즈 체크
      if (props.fileTypeInputNameMaxSize !== undefined && files.length > 0) {
        const maxSize =
          props.fileTypeInputNameMaxSize.size *
          (props.fileTypeInputNameMaxSize.unit === "KB"
            ? 1024
            : props.fileTypeInputNameMaxSize.unit === "MB"
            ? 1024 * 1024
            : 1024 * 1024 * 1024);
        if (files[0].size > maxSize) {
          alert(
            `파일 사이즈는 ${props.fileTypeInputNameMaxSize.size}${props.fileTypeInputNameMaxSize.unit} 이하여야 합니다.`
          );
          return;
        }
      }

      if (
        props.additionalProps !== undefined &&
        props.additionalProps.multiple
      ) {
        props.setValue?.(files);

        if (files.length === 0) {
          resetInputValue();
        }
      } else {
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        imageController.uploadImage(formData).then((res) => {
          const imageUrl = res.data.result[0];

          props.fileTypeInputName
            ? props.setValue({
                FILE_URL: imageUrl,
                FILE_NAME: files[0].name,
              })
            : props.setValue(imageUrl);
        });

        // props.setValue?.(files[0] || null);

        if (!files[0]) {
          resetInputValue();
        }
      }
    };
    //* 파일 선택 시 파일 네임 가져오는 함수
    const getTheInputText = () => {
      if (
        props.value === null ||
        (Array.isArray(props.value) && props.value.length === 0)
      ) {
        return (
          (props.additionalProps !== undefined &&
            props.additionalProps.placeholder) ||
          ""
        );
      }

      return "";
    };

    //* Hooks

    return (
      <Box sx={{ width: props.width }}>
        {props.type === "select" ? (
          <Select
            sx={{
              width: "100%",
              bgcolor: "white",
              ...props.style,
            }}
            displayEmpty={true}
            value={props.value}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            {...props.additionalProps}
          >
            <MenuItem value="">
              <Typography
                sx={{
                  color: "#919298",
                }}
              >
                {props.label}
              </Typography>
            </MenuItem>
            {props.dataList &&
              props.dataList?.map((item: any) => {
                return (
                  <MenuItem
                    key={item?.label}
                    value={item.value}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "400px",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
          </Select>
        ) : props.type === "search" ? (
          <OutlinedInput
            sx={{ width: "100%", bgcolor: "white", ...props.style }}
            id="outlined-adornment-weight"
            value={props.value}
            {...props.additionalProps}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.btnOnClick && props.btnOnClick();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                {(props.value === "" || props.value) && (
                  <Typography
                    mr={1}
                    onClick={() => {
                      props.setValue("");
                      props.eraseValue && props.eraseValue();
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "0.9rem",
                        color: "secondary.dark",
                      }}
                    />
                  </Typography>
                )}
                <SearchIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  fontSize="small"
                  onClick={() => {
                    props.btnOnClick && props.btnOnClick();
                  }}
                />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        ) : props.type === "checkbox" ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              py: 0.5,
              borderRadius: "10px",
              backgroundColor:
                props.label === "전체 동의" ? "#F8FAFC" : "white",
            }}
          >
            {typeof props.value === "boolean" ? (
              <FormControlLabel
                control={
                  <Checkbox
                    size="medium"
                    checked={props.value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.setValue(event.target.checked);
                    }}
                    sx={{ ml: props.label === "전체 동의" ? "16px" : "0px" }}
                  />
                }
                sx={{
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                }}
                labelPlacement={props.label ? "end" : "bottom"}
                {...props.additionalProps}
                label={props.label ? props.label : ""}
              />
            ) : (
              <Typography color={"error"}>
                체크박스 value 타입은 boolean 이어야만 합니다.
              </Typography>
            )}
          </Box>
        ) : props.type === "fileinput" ? (
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Button
              sx={{
                color: "white",
                py: "8px",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: 0,
                width: "88px",
                height: "48px",
              }}
              variant="contained"
              color="secondary"
              onClick={(e) => {
                if (inputRef.current !== null) {
                  // console.log(
                  // 	inputRef.current
                  // );
                  inputRef.current.click();
                }
              }}
            >
              파일추가
            </Button>
            <TextField
              {...props.additionalProps}
              ref={ref}
              error={props.error}
              type="file"
              onChange={fileChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      width: "50%",
                    }}
                  >
                    <Typography color={"#282930"} noWrap>
                      {props.fileTypeInputName
                        ? props.value.FILE_NAME
                        : props.value.FILE_NAME === ""
                        ? props?.additionalProps?.placeholder
                        : props.value}
                    </Typography>
                  </InputAdornment>
                ),

                inputProps: {
                  multiple:
                    props.additionalProps !== undefined &&
                    props.additionalProps.multiple,
                  ref: inputRef,
                  text: getTheInputText(),
                },
              }}
              sx={{
                'input[type="file"]': {
                  visibility: "hidden",
                },
                width: "75%",
                "& .MuiInputBase-root": { height: "48px" },
                ...props.style,
              }}
            />
          </Box>
        ) : props.type === "inputwithbtn" ? (
          <OutlinedInput
            id="outlined-adornment-weight"
            sx={{ width: "100%", ...props.style }}
            value={props.value}
            type={props.inputType}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            {...props.additionalProps}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  sx={{
                    height: "30px",
                    width: "70px",
                    bgcolor: "common.black",
                    color: "white",
                    ":hover": {
                      bgcolor: "secondary.main", // theme.palette.primary.main
                      color: "common.black",
                    },
                    marginTop:
                      props.additionalProps !== undefined &&
                      props.additionalProps.multiline
                        ? "auto"
                        : 0,
                  }}
                  onClick={props.btnOnClick}
                >
                  <Typography color={"white"} variant="body2">
                    {props.btnContent}
                  </Typography>
                </Button>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        ) : props.type === "password" ? (
          <OutlinedInput
            sx={{ width: "100%", ...props.style }}
            type={"password"}
            value={props.value}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                {props.children ? props.children : <></>}
              </InputAdornment>
            }
            {...props.additionalProps}
          />
        ) : props.type === "chip" ? (
          <Box display={"flex"}>
            {props.dataList.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    marginRight: "5px",
                  }}
                >
                  {item}
                </Box>
              );
            })}
          </Box>
        ) : props.type === "multiselect" && Array.isArray(props.value) ? (
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={props.value}
            onChange={() => props.handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            fullWidth
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {props.dataList.map((name: any) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        ) : props.type === "addablestringlist" ? (
          <Box>
            {/* 데이터 입력 부분 */}
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <OutlinedInput
                sx={{ width: "90%", ...props.style }}
                value={addableData}
                onChange={(e) => {
                  setAddableData(e.target.value);
                }}
                {...props.additionalProps}
                type={props.inputType}
              />
              <AddCircleIcon
                onClick={() => {
                  if (addableData !== "") {
                    props.handleAdd && props.handleAdd(addableData);
                    setAddableData("");
                  }
                }}
              />
            </Box>
            {/* 데이터 리스트 부분 */}
            {props.value?.map((item: string, index: number) => {
              return (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={1}
                  key={index}
                >
                  <OutlinedInput
                    sx={{ width: "90%", ...props.style }}
                    value={item}
                    disabled
                    {...props.additionalProps}
                    type={props.inputType}
                  />
                  <RemoveCircleIcon
                    onClick={() => {
                      props.handleDelete && props.handleDelete(item, index);
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <OutlinedInput
            sx={{ width: "100%", ...props.style }}
            value={props.value}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            {...props.additionalProps}
            inputProps={{
              maxLength: props.maxLength,
            }}
            {...props.outLineInputProps}
            type={props.inputType}
            error={props.error}
            placeholder={props.label}
          />
        )}
      </Box>
    );
  }
);

export default Input;
