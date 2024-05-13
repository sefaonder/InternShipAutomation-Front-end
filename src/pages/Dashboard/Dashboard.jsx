import { PDFViewer } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PdfInternform from 'src/PDF/internform/PdfInternform';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';
function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();
  const internform = useSelector((state) => state.internForm);
  console.log(internform);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess]);

  return (
    <div>
      {/* <PDFDownloadLink fileName="FORM" document={<PdfSurvey data={res} />}>
        {({ loading }) => (loading ? <button>loading Document..</button> : <button> download </button>)}
      </PDFDownloadLink> */}
      {/* <PDFViewer style={{ width: '100%', height: '1000px  ' }}>
        <PdfInternform data={internform} />
      </PDFViewer> */}
    </div>
  );
}

export default Dashboard;
