<?php
	error_reporting(0);
	
	$length = 10;
	$product = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),0, $length);
	
	$j = 0;     
	//$dirname = "//SANDBOX/morkartImg/".$product."/";
	//$dirname = "//LOCAL-2/htdocs/MorekartImages/".$product."/";
	$dirname = "../carImages/".$product."/";
	mkdir($dirname, 0777);
	
	$error;
	$message;

	
	for ($i = 0; $i < count($_FILES['file']['name']); $i++) {
		
		$validextensions = array("jpeg", "jpg", "png");      
		$ext = explode('.', basename($_FILES['file']['name'][$i]));  
		$j = $j + 1;      
		$file_extension = end($ext); 
		$file_name = $j.".".$file_extension;
		$target_path = $dirname.$file_name;
		
		if (($_FILES["file"]["size"][$i] < 1000000) && in_array($file_extension, $validextensions)) {
			//$img64 = file_get_contents($_FILES['file']['tmp_name'][$i]);
			//$imgMain = base64_encode($img64);
			//array_push($img64Array, $target_path);
			if(file_exists($target_path)){
				echo "File already exists";
				exit;
			}
			elseif(move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_path)){
				make_thumb($target_path,$dirname.$j."_thumb100.jpg",100);
				//make_thumb($target_path,$dirname.$j."_thumb100.".$file_extension,100);
				//$img64 = file_get_contents($j."_thumb100.".$file_extension);
				//$imgMain = base64_encode($img64);
				//array_push($img64Array,$dirname.$j."_thumb100.".$file_extension);
				$message =  'Image successfully uploaded';
				$error =  0;
				
			} else {     
				$message = $file_name.' not uploaded';
				$error =  1;
				rmdir($dirname);
			}
		} 
		else {     
			$message = $file_name.' Invalid file Size or Type';
			$error =  2;
			rmdir($dirname);
		}
	}
	//print_r($img64Array);

	$img64Array =  array(
		'error' => $error,
'message' => $message,
'folderName' => $product,
'count' => $j,
);
echo json_encode($img64Array);

function make_thumb($src, $dest, $desired_width) {

/* read the source image */
$source_image = imagecreatefromjpeg($src);
$width = imagesx($source_image);
$height = imagesy($source_image);


if($width > $height){
if($width > 200){
$desired_height = floor($height * (200 / $width));
$virtual_image = imagecreatetruecolor(200, 350);
$color = imagecolorallocate($virtual_image, 255, 255, 255);
imagefill($virtual_image, 0, 0, $color);
$top = (350 - $desired_height)/2;
imagecopyresampled($virtual_image, $source_image, 5, $top, 0, 0, 190, $desired_height, $width, $height);
imagejpeg($virtual_image, $dest);
}
else{
$desired_height = floor($height * ($width/200));
$virtual_image = imagecreatetruecolor(200, 350);
$color = imagecolorallocate($virtual_image, 255, 255, 255);
imagefill($virtual_image, 0, 0, $color);
$top = (350 - $desired_height)/2;
$left = (200 - $width)/2;
imagecopyresampled($virtual_image, $source_image, $left, $top, 0, 0, $width, $desired_height, $width, $height);
imagejpeg($virtual_image, $dest);
}
}
else{
if($height > 350){
if($width > 200){
$desired_height = floor($height * (200 / $width));
$desired_width = floor($width * ($desired_height / $height));
}
else{
$desired_width = floor($width * (350 / $height));
$desired_height = floor($height * ($desired_width / $width));
}

$virtual_image = imagecreatetruecolor(200, 350);
$color = imagecolorallocate($virtual_image, 255, 255, 255);
imagefill($virtual_image, 0, 0, $color);
$top = (350 - $desired_height)/2;
$left = (200 - $desired_width)/2;
imagecopyresampled($virtual_image, $source_image, $left, $top, 0, 0, $desired_width, $desired_height, $width, $height);
imagejpeg($virtual_image, $dest);
}
else{
$desired_width = floor($width * ($height/350));
$virtual_image = imagecreatetruecolor(200, 350);
$color = imagecolorallocate($virtual_image, 255, 255, 255);
imagefill($virtual_image, 0, 0, $color);
$top = (350 - $height)/2;
$left = (200 - $desired_width)/2;
imagecopyresampled($virtual_image, $source_image, $left, $top, 0, 0, $desired_width, $height, $width, $height);
imagejpeg($virtual_image, $dest);
}
}

/* find the "desired height" of this thumbnail, relative to the desired width  */
/*$desired_height = floor($height * ($desired_width / $width));*/

/* create a new, "virtual" image */
/*$virtual_image = imagecreatetruecolor($desired_width, $desired_height);*/
/*$virtual_image = imagecreatetruecolor(250, 400);*/

/* fill with color*/

/*$red = imagecolorallocate($virtual_image, 255, 255, 255);
imagefill($virtual_image, 0, 0, $red);*/

/* copy source image at a resized size */
/*imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);*/
/*imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);*/

/* create the physical thumbnail image to its destination */
/*imagejpeg($virtual_image, $dest);*/
}
?>