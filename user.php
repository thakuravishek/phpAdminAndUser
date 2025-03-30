<?php
    error_reporting(E_ALL);
    ini_set('display_errors',1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    $db_conn= mysqli_connect("localhost", "root", "", "employee-credentials" );
    if($db_conn===false){
        die("ERROR: Could not connect".mysqli_connect_error());
    }

    $method = $_SERVER['REQUEST_METHOD'];

    // echo "test---".$method; die;

    switch ($method) {
        case 'GET':
            $path=explode('/',$_SERVER['REQUEST_URI']);
            if(isset($path[4])&& is_numeric($path[4])){
                $json_array=array();
                $userid=$path[4];
                $getuserrow= mysqli_query($db_conn, "SELECT * FROM tbl_user WHERE userid='$userid' ");
                while($userrow=mysqli_fetch_array($getuserrow)){
                    $json_array['rowuserdata']=array('id'=>$userrow['userid'],'username'=>$userrow['username'],'useremail'=>$userrow['useremail'],'phoneno'=>$userrow['phoneno'],'gender'=>$userrow['gender']);
                }
                echo json_encode( $json_array['rowuserdata']);
                return;
            }else{

            $alluser= mysqli_query($db_conn, "SELECT * FROM tbl_user") ;
            if(mysqli_num_rows($alluser) > 0){
               while($row= mysqli_fetch_array($alluser)) {
                $json_array["userdata"][]=array("id"=>$row['userid'],"username"=>$row["username"],"useremail"=>$row["useremail"],"phoneno"=>$row["phoneno"],"gender"=>$row["gender"]);
               }
               echo json_encode($json_array["userdata"]);
               return;
            }else{
                echo json_encode(["result"=>"Please check the data"]);
                return;
            }
            }

            break;
        case "POST":
            $userPostData=json_decode(file_get_contents("php://input"));
            // echo "Data Received SuccessFully";
            // print_r($userPostData); die;
            $username=$userPostData->username;
            $useremail=$userPostData->useremail;
            $phoneno=$userPostData->phoneno;
            $gender=$userPostData->gender;
            $result=mysqli_query($db_conn, "INSERT INTO tbl_user(username,useremail,phoneno,gender) VALUES('$username','$useremail','$phoneno','$gender')");

            if($result){
                echo json_encode(["success"=>"User added Successfully."]);
                return;
            }else{
                echo json_encode(["success"=>"Please check user data."]);
                return;
            }
            break;
            case "PUT":
                $userupdate=json_decode(file_get_contents("php://input"));
                $userid=$userupdate->id;
                $username=$userupdate->username;
                $useremail=$userupdate->useremail;
                $phoneno=$userupdate->phoneno;
                $gender=$userupdate->gender;
                $updatedata=mysqli_query($db_conn, "UPDATE tbl_user SET username='$username', useremail='$useremail', phoneno='$phoneno', gender='$gender' WHERE userid='$userid' ");

                if($updatedata){
                echo json_encode(["success"=>"User Updated Successfully."]);
                return;
            }else{
                echo json_encode(["success"=>"Please check user data."]);
                return;
            }
                break;

            case "DELETE":
                $path=explode('/',$_SERVER["REQUEST_URI"]);
                $result = mysqli_query($db_conn, "DELETE FROM tbl_user WHERE userid='$path[4]' ");
                if ($result) {
                    echo json_encode(["success"=>"User Deleted Successfully."]);
                    return;
                }else{
                    echo json_encode(["success"=>"Please check user data."]);
                return;
                }
                break;
        
    }
    
?>