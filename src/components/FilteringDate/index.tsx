import { Box, Button, Typography } from "@mui/material";
import CustomDatePicker from "../CustomDatePicker";
import OriginButton from "../Button/OriginButton";
import { useTranslation } from "react-i18next";
interface IfilteringDateProps {
  filterings: any[];
  dateType: string;
  startDate: any;
  endDate: any;
  setDateType: (type: string) => void;
  setStartDate: (date: any) => void;
  setEndDate: (date: any) => void;
  onSearch: (filter: any) => void;
}

const FilteringDate = (props: IfilteringDateProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {props.filterings.map((filter, index) => (
          <Button
            key={index}
            variant={props.dateType === filter.value ? "contained" : "outlined"}
            sx={{
              color: props.dateType === filter.value ? "white" : "#61636C",
              border: "1px solid #B1B2B6",
              borderRadius: "4px",
              backgroundColor:
                props.dateType === filter.value ? "#282930" : "white",
              height: "32px",
              padding: "4px 10px",
              width: "fit-content",
              minWidth: "auto",
              fontSize: "12px",
            }}
            onClick={() => {
              props.setDateType(filter.value);
              props.onSearch({
                DATE_TYPE: filter.value,
              });
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Box>
      {/* 컴포넌트화 필요 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CustomDatePicker
          selectedDate={props.startDate}
          setSelectedDate={props.setStartDate}
        />
        ~
        <CustomDatePicker
          selectedDate={props.endDate}
          setSelectedDate={props.setEndDate}
        />
        <OriginButton
          fullWidth
          variant="contained"
          color="#2E2F37"
          onClick={() => {
            props.setDateType("");
            props.onSearch({
              START_DATE: props.startDate,
              END_DATE: props.endDate,
            });
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              조회
            </Typography>
          }
          style={{
            marginTop: "0px",
            padding: "8px",
            width: "88px",
            borderRadius: "5px",
            height: "40px",
          }}
        />
      </Box>
    </Box>
  );
};
export default FilteringDate;
