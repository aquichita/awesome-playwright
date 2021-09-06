import { dataPrefix } from '@utils/dataProvider'
import connection from '@utils/sqlConnection'

export default async function clearTestData() {
    const dataTabName: Array<string> = [
        'tbl_servprov_share',
        'basic_return_aging_b',
        'tbl_charging_agreement',
        'tbl_charging_rule',
        'basic_customer_b',
        'basic_oil_b',
        'basic_servprov_b',
        'tbl_charging_agreement',
        'basic_aging_b',
        'basic_distance_b',
        'basic_servprov_rule_b',
        'basic_item_b',
        'basic_contact_b',
        'basic_equipment_group_b',
        'basic_equipment_group_b',
        'basic_equipment_group_b',
        'basic_calendar',
        'tbl_distribution_route',
        'tbl_distribution_route',
        'basic_area_b',
        'basic_location_b',
        'basic_item_type_b',
        'basic_fee_class_b',
        'basic_fee_type_b',
        'basic_transport_mode_b',
        'basic_order_type_b',
        'tbl_rule',
        'tbl_rule_group',
        'basic_business_unit_b',
        'tbl_route_rule',
        'basic_document_type',
        'basic_equipment_b',
        'basic_driver_b'
    ]
    connection.connect()
    dataTabName.map((tabName) => {
        const sql = `DELETE FROM ${tabName} WHERE (XID LIKE "${dataPrefix}%") OR (NAME LIKE "${dataPrefix}%")`
        connection.query(sql, (error: Error) => {
            if (error) throw error
        })
        return connection.commit()
    })
    const tblOrderMovement = `DELETE FROM tbl_order_movement WHERE BUSINESS_NUMBER LIKE "${dataPrefix}%"`
    connection.query(tblOrderMovement, (error: Error) => {
        if (error) throw error
    })
    const tblShipment = `DELETE FROM tbl_shipment WHERE MOVEMENT_BUSINESS_NUMBER LIKE "${dataPrefix}%"`
    connection.query(tblShipment, (error: Error) => {
        if (error) throw error
    })
    connection.end()
}
