import React from 'react';
import { Layout, Row, Col, Input, Button, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 0' }}>
      <Row gutter={[24, 24]} justify="center">
        {/* Company Info */}
        <Col xs={24} sm={8} md={6}>
          <div style={{ marginBottom: '20px' }}>
            <img src="https://placehold.co/60x60/000000/FFFFFF?text=IVS" alt="IVS Logo" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
            <Text strong style={{ fontSize: '18px' }}>footer_company_name</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <EnvironmentOutlined style={{ color: '#ff9900', marginRight: '8px' }} />
            <Text>Địa chỉ</Text>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <MailOutlined style={{ color: '#ff9900', marginRight: '8px' }} />
            <Text>nmi.triet@gmail.com</Text>
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={8} md={6}>
          <Title level={5} style={{ marginBottom: '16px', color: '#fff' }}>LIÊN KẾT NHANH</Title>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Về chúng tôi</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Liên hệ</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Tuyển Dụng</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Điều khoản dịch vụ</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Chính sách bảo mật</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Đọc truyện</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Tin tức</a></Text></li>
          </ul>
        </Col>

        {/* Services */}
        <Col xs={24} sm={8} md={6}>
          <Title level={5} style={{ marginBottom: '16px', color: '#fff' }}>SERVICES</Title>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>IVS Academy</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>IVS Celestech</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>IVS Media</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>IVS LifeMinds</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>R&D Chương trình</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Thiết kế Web</a></Text></li>
            <li><Text><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>ivstech.store</a></Text></li>
          </ul>
        </Col>

        {/* Newsletter Subscription */}
        <Col xs={24} sm={8} md={6}>
          <Title level={5} style={{ marginBottom: '16px', color: '#fff' }}>ĐĂNG KÝ NHẬN BẢN TIN</Title>
          <Text style={{ color: '#ccc', marginBottom: '16px' }}>
            Nhập Email của bạn để nhận thông tin cập nhật mới nhất từ IVS JSC.
          </Text>
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <Input placeholder="Nhập Email của bạn" style={{ flex: 1, marginRight: '8px' }} />
            <Button type="primary" style={{ backgroundColor: '#ff9900', borderColor: '#ff9900' }}>
              Đăng ký
            </Button>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Text strong style={{ color: '#fff' }}>footer_fanpages_title</Text>
            <div style={{ display: 'flex', marginTop: '8px' }}>
              <img src="https://placehold.co/100x100/000000/FFFFFF?text=IVS+Academy" alt="IVS Academy" style={{ width: '100px', height: '100px', marginRight: '8px' }} />
              <img src="https://placehold.co/100x100/000000/FFFFFF?text=IVS+JSC" alt="IVS JSC" style={{ width: '100px', height: '100px' }} />
            </div>
          </div>
        </Col>

        {/* Social Media */}
        <Col xs={24} sm={24} md={12} style={{ textAlign: 'center' }}>
          <Title level={5} style={{ marginBottom: '16px', color: '#fff' }}>KẾT NỐI</Title>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>YouTube</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>TikTok</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Zalo OA</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Facebook Công ty</a>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Text style={{ color: '#ccc', fontSize: '12px' }}>
              Verified Enterprise<br />
              D.U.N.S: 64-643-4880<br />
              View Company Profile →<br />
              © 2024 | IVS_JSC<br />
              Bản quyền số: 6207/2024/QTG
            </Text>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
